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

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { DataService } from '../../core/services/data/data.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { LoggerService } from '../../core/services/logger/logger.service';
@Component({
  selector: 'app-imagecrop',
  templateUrl: './imagecrop.component.html',
  styleUrls: ['./imagecrop.component.scss']
})
export class ImagecropComponent implements OnInit {
  ImageFileCropped: any;


  constructor(
    private dialogRef: MatDialogRef<ToolbarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpService,
    private service: DataService
  ) { }

  ngOnInit() {
  }
  imageCropped(event) {
    this.ImageFileCropped = event.file;
  }
  token = localStorage.getItem('token');

  cancel(){
    this.dialogRef.close();
  }
  imageUpload() {
    const uploadData = new FormData();
    uploadData.append('file', this.ImageFileCropped);
    this.httpService.addImage('user/uploadProfileImage', uploadData, this.token).subscribe(response => {
      LoggerService.log("response of Image",response);
      localStorage.setItem('imageUrl', response['status'].imageUrl);
      this.dialogRef.close();
      this.service.changeImage(true);
    }, error => {
      LoggerService.log(error);
    })

  }


}