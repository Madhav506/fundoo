import { Component, OnInit, Input } from '@angular/core';
import { DialogCollaboratorComponent } from '../dialog-collaborator/dialog-collaborator.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatMenu } from '@angular/material';

@Component({
  selector: 'app-collaboratoricon',
  templateUrl: './collaboratoricon.component.html',
  styleUrls: ['./collaboratoricon.component.scss']
})
export class CollaboratoriconComponent implements OnInit {

  constructor(public dialog:MatDialog) { }
@Input() noteId;
  ngOnInit() {
  }
/**to open a dialog collaborator where collaborators adding and removing can be done */
  addCollaborator(){
    const dialogRef = this.dialog.open(DialogCollaboratorComponent, {
      maxWidth: 'auto',
      height: 'auto',
      data:this.noteId,
      panelClass: 'myapp-no-padding-dialog'

    });


}

}
