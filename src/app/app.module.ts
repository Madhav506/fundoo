
import { HttpService } from './core/services/http/http.service';
import { LoggerService } from './core/services/logger/logger.service';
import { DataService } from './core/services/data/data.service';
import { AuthguardGuard } from '../app/core/services/auth/authGuard/auth.guard';

import { SearchPipe } from './core/pipes/search/search.pipe';

import { AppRoutingModule } from './app-routing.module';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  ErrorHandler
} from '@angular/core';
import {
  MatTooltipModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatChipsModule,
  MatNativeDateModule,
  MatSelectModule,
  
  MatMenu

} from '@angular/material';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { SlidePanelComponent } from './components/slide-panel/slide-panel.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NotesComponent } from './components/notes/notes.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { RemindiconComponent } from './components/remindicon/remindicon.component';
import { ImageiconComponent } from './components/imageicon/imageicon.component';
import { CollaboratoriconComponent } from './components/collaboratoricon/collaboratoricon.component';
import { ColoriconComponent } from './components/coloricon/coloricon.component';
import { ArchiveiconComponent } from './components/archiveicon/archiveicon.component';
import { MoreiconComponent } from './components/moreicon/moreicon.component';
import { NotescardComponent } from './components/notescard/notescard.component';
import { NotesParentComponent } from './components/notes-parent/notes-parent.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AddlabelComponent } from './components/addlabel/addlabel.component';
import { SearchComponent } from './components/search/search.component';
import { LabelsComponent } from './components/labels/labels.component';
import { DeletedialogComponent } from './components/deletedialog/deletedialog.component';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImagecropComponent } from './components/imagecrop/imagecrop.component';
import { PinComponent } from './components/pin/pin.component';
import { MessagingService } from './core/services/messaging/messaging.service';
import { UserService } from './core/services/user/user.service';
import { NotesService } from './core/services/notes/notes.service';

import { InterceptService} from './core/services/interceptor/interceptor.service';
import { ErrorsHandler } from './core/services/errorhandler/errors-handler';
import { DialogCollaboratorComponent } from './components/dialog-collaborator/dialog-collaborator.component';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    SlidePanelComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    HomeComponent,
    ToolbarComponent,
    NotesComponent,
    RemindersComponent,
    ArchiveComponent,
    TrashComponent,
    RemindiconComponent,
    ImageiconComponent,
    CollaboratoriconComponent,
    ColoriconComponent,
    ArchiveiconComponent,
    MoreiconComponent,
    NotescardComponent,
    NotesParentComponent,
    DialogComponent,
    AddlabelComponent,
    SearchPipe,
    SearchComponent,
    LabelsComponent,
    DeletedialogComponent,
    ImagecropComponent,
    PinComponent,
    DialogCollaboratorComponent,
 

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    MatChipsModule,
    MatNativeDateModule,
    ImageCropperModule,
    MatSelectModule,
    HttpClientModule
    // MomentDateAdapter,
    

  ],
  entryComponents: [DialogComponent, AddlabelComponent, DeletedialogComponent,
    ImagecropComponent,ToolbarComponent,DialogCollaboratorComponent],
    
  providers: [HttpService,AuthguardGuard, DataService, UserService,NotesService,
    LoggerService,MessagingService,InterceptService,{
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    }],
  bootstrap: [AppComponent]//2
})
export class AppModule { }
