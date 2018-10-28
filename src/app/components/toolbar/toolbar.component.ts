import { Component,OnInit } from '@angular/core';
import{HttpService} from '../../services/http.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { AddlabelComponent } from '../addlabel/addlabel.component';



@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
  name='';
  firstCharacter='';
  token;
  firstName;
  lastName;
  
raw_data;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog,public snackBar: MatSnackBar,private router:Router,public http:HttpService ) {

  }

  ngOnInit(){
   this.raw_data=localStorage.getItem('first');
   this.firstName=localStorage.getItem('firstName');
   this.lastName=localStorage.getItem('lastName');
    console.log(this.raw_data);
  var user=this.raw_data.split("");
  this.firstCharacter=user[0];
  // console.log(this.firstCharacter);
 this.token= localStorage.getItem('token');
 console.log(this.token);


  }
  logout() {
    this.http.postLogout("user/logout",this.token).subscribe(
      data => {
        console.log(data);
        localStorage.clear();
       
        this.router.navigate(['/login']);
    
      }
    );
    error => {/**if error exists then displays the error message using snackbar */
      console.log("Error", error);
      this.snackBar.open("error","logout unsuccessfull" , {
                duration: 10000,
              });
    }
  }
  openDialogLabel(): void {
    
    const dialogRef = this.dialog.open(AddlabelComponent,{
      width: '250px',
      height:'auto',
      data: "",
      panelClass:'myapp-no-padding-dialog'
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
    });
  }

  
  }
