import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http/http.service';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(public http: HttpClient, public service: HttpService) { }
  public token = localStorage.getItem('token');

  url = environment.baseUrl;

  /**Notes services methods */
  getNotesList() {
    let url = this.url + "notes/getNotesList";
    return this.service.httpget(url);
  }
  addNotes(input) {
    let url = this.url + "notes/addnotes";
    return this.service.httppostpassword(url, input);

  }
  updateNotes(input) {
    let url = this.url + "notes/updateNotes";
    return this.service.httppostpassword(url, input);
    /**passing the input & calling the  getFormUrlEncoded()*/
  }

  /**Notes labels service methods */
  getLabels() {
    let url = this.url + "noteLabels/getNoteLabelList";
    return this.service.httpget(url);
  }
  postNoteLabels(body) {
    let url = this.url + "noteLabels";
    return this.service.httpPost(url, body);
  }
  postAddLabelnotes(label, note, {}) {
    let url = this.url + "notes/" + note + "/addLabelToNotes/" + label + "/add";;
    return this.service.httpPost(url, {});
  }
  postUpdateNotelabel(labelid, body) {
    let url = this.url + "noteLabels/" + labelid + "/updateNoteLabel";
    return this.service.httpPost(url, body);
  }
  postAddLabelnotesRemove(note, label, { }) {
    let url = this.url + "notes/" + note + "/addLabelToNotes/" + label + "/remove";;
    return this.service.httpPost(url, {});
  }
  deleteData(labelid) {/**get() service to get the data */
    let url = this.url + "noteLabels/" + labelid + "/deleteNoteLabel";
    return this.http.delete(url);/**returns the output */
  }

  /**Notes Archive services methods */

  getArchiveNotes() {
    let url = this.url + "notes/getArchiveNotesList";
    return this.service.httpget(url);
  }
  postArchiveNotes(model) {
    let url = this.url + "notes/archiveNotes";
    return this.service.httpPost(url, model);
  }
  /**Notes trash services methods */

  postTrashNotes(model) {
    let url = this.url + "notes/trashNotes";
    return this.service.httpPost(url, model);
  }
  postDeleteForeverNotes(model) {
    let url = this.url + 'notes/deleteForeverNotes';
    return this.service.httpPost(url, model);
  }

  /**Notes Color services methods */
  postChangeColor(model) {
    let url = this.url + "notes/changesColorNotes";
    return this.service.httpPost(url, model);
  }
  /**Notes CheckList services methods */

  postUpdateChecklist(id, modifiedid, model) {
    let url = this.url + "notes/" + id + "/checklist/" + modifiedid + "/update";
    return this.service.httpPost(url, model);
  }
  postChecklistRemove(dataid, removeid, model) {
    let url = this.url + "notes/" + dataid + "/checklist/" + removeid + "/remove";
    return this.service.httpPost(url, model);
  }

  postCheckListAdd(dataid, model) {
    let url = this.url + "notes/" + dataid + "/checklist/add";
    return this.service.httpPost(url, model);
  }

  /**Notes reminders services methods */

  postRemoveReminders(model) {
    let url = this.url + '/notes/removeReminderNotes';
    return this.service.httpPost(url, model);
  }
  getReminders() {
    let url = this.url + '/notes/getReminderNotesList';
    return this.service.httpget(url);
  }
  postAddUpdateReminderNotes(model) {
    let url = this.url + '/notes/addUpdateReminderNotes';
    return this.service.httpPost(url, model);
  }
  /**image services methods */

  imageUpload(model) {
    let url = this.url + '/user/uploadProfileImage';
    return this.service.httpImage(url, model)
  }
  /**pushtoken services methods */

  postRegisterPushToken(model) {
    let url = this.url + 'user/registerPushToken';
    return this.service.httpPost(url, model);
  }
  /**pin service methods */
  postPinUnpin(model) {
    let url = this.url + "notes/pinUnpinNotes";
    return this.service.httpPost(url, model);
  }


}


