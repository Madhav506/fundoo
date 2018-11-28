import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service'
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddlabelComponent } from '../addlabel/addlabel.component';
import { DataService } from '../../core/services/data/data.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { ImagecropComponent } from '../imagecrop/imagecrop.component';
import { environment } from '../../../environments/environment';
import { NotesService } from '../../core/services/notes/notes.service';
import { UserService } from '../../core/services/user/user.service';
import { Label } from '../../core/model/label';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
@Input()
export class ToolbarComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Output() eventClicked = new EventEmitter<Event>();

  private searchInput;
  public name = '';
  public firstCharacter = '';
  private token;
  public firstName;
  public lastName;
  public labelItem = [];
  private ArrayOfLabel = [];
  public file1 = [];
  private values;
  public value = 0;
  public url: string;
  public result;
  private profile;


  // image= localStorage.getItem('imageUrl')

  raw_data;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  imageChangedEvent: any;
  croppedImage: string;
  image2: string;
  imageProfile: string;

  constructor(private cdRef: ChangeDetectorRef, private breakpointObserver: BreakpointObserver,
    public dataService: DataService, public service: HttpService, public notesService: NotesService,
    public dialog: MatDialog, public snackBar: MatSnackBar, private router: Router,
    public http: HttpService, public userService: UserService, public route: ActivatedRoute) {
  }


  ngOnInit() {

    this.dataService.currLabel
      .pipe(takeUntil(this.destroy$))
      .subscribe(message =>
        this.values = message);

    this.route.firstChild.paramMap.subscribe(
      (params: ParamMap) => {

        this.values = params['params'].id;

      })

  

    if (this.router.url == "/home/notes") {
      this.values = "fundoo"
    }
    if (this.router.url == "/home/archive") {
      this.values = "Archive"
    }
    if (this.router.url == "/home/search") {
      this.values = "fundoo"
    }
    if (this.router.url == "/home/reminders") {
      this.values = "Reminders"
    }
    if (this.router.url == "/home/trash") {
      this.values = "Trash "
    }
    if (this.router.url == "/home/notes/:noteid/questionAnswers") {
      this.values = "fundoo "
    }


    this.raw_data = localStorage.getItem('first');
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    let user = this.raw_data.split("");
    this.firstCharacter = user[0];
    this.token = localStorage.getItem('token');
    this.getLabel();

  }
  logout() {
    this.userService.postLogout()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          localStorage.clear();

          this.router.navigate(['/login']);

        }
      )
  }
  refresh() {
    location.reload();
  }

  getLabel() {
    this.notesService.getLabels()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.ArrayOfLabel = [];
        let response: Label[] = [] = result['data'].details;

        for (let index = 0; index < response.length; index++) {
          if (response[index].isDeleted == false) {
            this.ArrayOfLabel.push(response[index]);

          }
        }
        this.ArrayOfLabel.sort(function (first, second) {
          let one = first.label.toLowerCase(), two = second.label.toLowerCase()
          if (one < two)
            return -1
          if (one > two)
            return 1
          return 0
        })
      })
  }

  clear() {
    this.searchInput = '';
  }
  openDialogLabel(): void {

    const dialogRef = this.dialog.open(AddlabelComponent, {
      width: '300px',
      height: 'auto',
      data: "",
      panelClass: 'myapp-no-padding-dialog'
    });
    const sub = dialogRef.componentInstance.eventTwo
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {

      });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.getLabel();

      });
  }
  clickSearch() {
    this.router.navigate(['home/notes/search']);
  }
  passmessage() {
    this.dataService.changeMessage(this.searchInput);

  }

  headingChange(heading) {
    this.values = heading;


  }
  heading(item) {
    this.values = item.label;

  }
  
  imageFile = null;
  public imageNew = localStorage.getItem('imageUrl');
  img = environment.profileUrl + this.imageNew;

  onFileUpload(event) {
    this.imageFile = event.path[0].files[0];
    const uploadImage = new FormData();
    uploadImage.append('file', this.imageFile, this.imageFile.name);
    this.openDialogImageCrop(event);

  }
  openDialogImageCrop(data) {
    const dialogRef1 = this.dialog.open(ImagecropComponent, {
      width: '400px',

      data: data

    });

    dialogRef1.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.dataService.currentImage
          .pipe(takeUntil(this.destroy$))
          .subscribe(imageResponse => this.profile = imageResponse)
        if (this.profile == true) {
          this.imageProfile = localStorage.getItem('imageUrl');
          this.img = environment.profileUrl + this.imageProfile;
        }
      });
  }
  public image = {};

  listView() {
    this.value = 1;
    this.dataService.changeAppearance(false);
  }

  gridView() {
    this.value = 0;
    this.dataService.changeAppearance(true);

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}
