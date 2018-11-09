import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  name: "trash";
}

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.css']
})

export class DeletedialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, ) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
