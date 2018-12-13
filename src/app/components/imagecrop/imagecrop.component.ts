// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-imagecrop',
//   templateUrl: './imagecrop.component.html',
//   styleUrls: ['./imagecrop.component.css']
// })
// export class ImagecropComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit, Inject,OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { DataService } from '../../core/services/data/data.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesService } from '../../core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-imagecrop',
  templateUrl: './imagecrop.component.html',
  styleUrls: ['./imagecrop.component.scss']
})
export class ImagecropComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  ImageFileCropped: any;


  constructor(
    private dialogRef: MatDialogRef<ToolbarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    public notesService:NotesService,
    private service: DataService
  ) { }

  ngOnInit() {
  }
  imageCropped(event) {
    this.ImageFileCropped = event.file;
  }
  private  token = localStorage.getItem('token');

  cancel() {
    this.dialogRef.close();
  }
  /**if you would like to change a profile picture then image upload method is invoked */
  imageUpload() {
    const uploadData = new FormData();
    uploadData.append('file', this.ImageFileCropped);
    this.notesService.imageUpload( uploadData)
    .pipe(takeUntil(this.destroy$))
        .subscribe(response => {
      LoggerService.log("response of Image", response);
      localStorage.setItem('imageUrl', response['status'].imageUrl);
      this.dialogRef.close();
      /**calling method in data service */
      this.service.changeImage(true);
    })

  }
  /**A callback method that performs custom clean-up,
   *  invoked immediately after a directive, 
   * pipe, or service instance is destroyed.
   */
  ngOnDestroy() { 
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


}