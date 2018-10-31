import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogModule} from '@angular/material';

import {MatTooltipModule} from '@angular/material/tooltip';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule }    from '@angular/common/http';
import { SlidePanelComponent } from './components/slide-panel/slide-panel.component';
// import { FormsModule } from '@angular/forms'; 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule, MatToolbarModule, MatSidenavModule, MatListModule} from '@angular/material';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatMenuModule} from '@angular/material/menu';
import { NotesComponent } from './components/notes/notes.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { HttpService } from './services/http.service';
import { RemindiconComponent } from './components/remindicon/remindicon.component';
import { ImageiconComponent } from './components/imageicon/imageicon.component';
import { CollaboratoriconComponent } from './components/collaboratoricon/collaboratoricon.component';
import { ColoriconComponent } from './components/coloricon/coloricon.component';
import { ArchiveiconComponent } from './components/archiveicon/archiveicon.component';
import { UndoiconComponent } from './components/undoicon/undoicon.component';
import { RedoiconComponent } from './components/redoicon/redoicon.component';
import { MoreiconComponent } from './components/moreicon/moreicon.component';
import { NotescardComponent } from './components/notescard/notescard.component';
import { NotesParentComponent } from './components/notes-parent/notes-parent.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AddlabelComponent } from './components/addlabel/addlabel.component';
import { AuthguardService } from './services/authguard.service';
import { AuthguardGuard } from './auth/auth.guard';
import {MatChipsModule} from '@angular/material/chips';
import { SearchPipe } from './search.pipe';



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
    UndoiconComponent,
    RedoiconComponent,
    MoreiconComponent,
    NotescardComponent,
    NotesParentComponent,
    DialogComponent,
    AddlabelComponent,
    SearchPipe,
   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule ,
    ReactiveFormsModule   ,
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
    MatChipsModule
    
    // FormBuilder, FormGroup, Validators
    
    
    
  ],
  entryComponents:[DialogComponent,AddlabelComponent],
  providers: [HttpService,AuthguardService,AuthguardGuard],
  bootstrap: [AppComponent]//2
})
export class AppModule { }
