import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service'
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AddlabelComponent } from '../addlabel/addlabel.component';
import { DataService } from '../../core/services/data/data.service';
import { LoggerService } from '../../core/services/logger/logger.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
@Input()
export class ToolbarComponent implements OnInit {
  @Output() eventClicked = new EventEmitter<Event>();
  searchInput;
  name = '';
  firstCharacter = '';
  token;
  firstName;
  lastName;
  labelItem = [];
  ArrayOfLabel = [];
  file1 = [];
  values;
  value = 0;
  url: string;
  result;
  
  // image= localStorage.getItem('imageUrl')

  raw_data;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private cdRef: ChangeDetectorRef,private breakpointObserver: BreakpointObserver, public dataService: DataService, public service: HttpService, public dialog: MatDialog, public snackBar: MatSnackBar, private router: Router, public http: HttpService) {

  }


  ngOnInit() {
    this.raw_data = localStorage.getItem('first');
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    // console.log(this.raw_data);
    var user = this.raw_data.split("");
    this.firstCharacter = user[0];
    // console.log(this.firstCharacter);
    this.token = localStorage.getItem('token');
    // console.log(this.token);
    this.getLabel();
  }
  logout() {
    this.http.postLogout("user/logout", this.token).subscribe(
      data => {
        // console.log(data);
        localStorage.clear();

        this.router.navigate(['/login']);

      }
    );
    error => {
      console.log("Error", error);
      this.snackBar.open("error", "logout unsuccessfull", {
        duration: 10000,
      });
    }
  }

  getLabel() {
    this.service.getCardData("noteLabels/getNoteLabelList", this.token).subscribe(result => {
      // console.log(result['data'].details);
      this.ArrayOfLabel = [];
      for (var index = 0; index < result['data'].details.length; index++) {
        if (result['data'].details[index].isDeleted == false) {
          this.ArrayOfLabel.push(result['data'].details[index]);
        }
      }
      // console.log(this.ArrayOfLabel);

    }),
      error => {
        console.log(error, "error");
      }
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
    const sub = dialogRef.componentInstance.eventTwo.subscribe((data) => {
      // console.log("sub", data);
    });
    dialogRef.afterClosed().subscribe(data => {
      this.getLabel();
      // console.log(data);
      // console.log('The dialog was closed');
    });
  }
  clickSearch() {
    this.router.navigate(['home/search']);
  }
  passmessage() {
    this.dataService.changeMessage(this.searchInput);

  }

  headingChange(heading) {
    this.values = heading;

  }
  imageFile = null;

  public imageNew = localStorage.getItem('imageUrl');
  img = "http://34.213.106.173/" + this.imageNew;

  onFileUpload(event) {
    this.imageFile = event.path[0].files[0];
    const uploadImage= new FormData();
    uploadImage.append('file', this.imageFile, this.imageFile.name);
    this.service.addImage('user/uploadProfileImage', uploadImage, this.token).subscribe(response => {

      LoggerService.log("image url path is" +response['status'].imageUrl)

      this.img = "http://34.213.106.173/" + response['status'].imageUrl;
      
      localStorage.setItem('imageUrl', response['status'].imageUrl);


    }, error => {
      console.log(error);

    })

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


}
