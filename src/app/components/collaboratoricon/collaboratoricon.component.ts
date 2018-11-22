import { Component, OnInit } from '@angular/core';
import { DialogCollaboratorComponent } from '../dialog-collaborator/dialog-collaborator.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatMenu } from '@angular/material';

@Component({
  selector: 'app-collaboratoricon',
  templateUrl: './collaboratoricon.component.html',
  styleUrls: ['./collaboratoricon.component.scss']
})
export class CollaboratoriconComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit() {
  }

  addCollaborator(){
    const dialogRef = this.dialog.open(DialogCollaboratorComponent, {
      width: '450px',
      height: 'auto',
      panelClass: 'myapp-no-padding-dialog'

    });


}

}
