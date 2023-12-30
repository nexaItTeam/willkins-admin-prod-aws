import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';
import { environment } from 'src/environment/env'
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  //store invoice and unit certificate in these variable
  public invoiceData:any
  public orderData: any
  public propertyData = []
  public token !: string
  constructor(private _http: HttpClient, private _sharedService: SharedService) {

  }

  getRequestHeaders(authenticate: boolean) {
    var headers: any = {
      'Accept': 'application/json'
    };
    if (authenticate) {
      // Append access token and referesh token
      // headers[ACCESS_TOKEN_KEY] = `Bearer ${this.appPreference.getAccessToken()}`;

      // if (endUrl == 'users/save' || endUrl == 'users/update') {
      headers['x-auth-token'] = this._sharedService.getAcessRoken()
      // }
    }
    return {
      headers: new HttpHeaders(headers),
    };
  }
  getPropertyList() {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.PROPERTY_ENDPOINT + 'getAll', [], headers);
  }
  updatePropertyList(body: any) {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.PROPERTY_ENDPOINT + 'update', body, headers);
  }
  addPropertyList(body: any) {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.PROPERTY_ENDPOINT + 'add', body, headers);
  }
  deletePropertyList(body: any) {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.PROPERTY_ENDPOINT + 'delete', body, headers);
  }
  getEnquiryList() {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.ENQUIRY_ENDPOINT + 'getAll', [], headers);
  }
  updateEnquiryList(body: any) {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.ENQUIRY_ENDPOINT + 'update', body, headers);
  }
  addEnquiryList(body: any) {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.ENQUIRY_ENDPOINT + 'add', body, headers);
  }
  deleteEnquiryList(body: any) {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.ENQUIRY_ENDPOINT + 'delete', body, headers);
  }
  loginUser(body: any) {

    return this._http.post(environment.USER_ENDPOINT + 'login', body);
  }

  addUserRole(body: any) {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.USER_ENDPOINT + 'register', body, headers);
  }
  updateUserRole(body: any) {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.USER_ENDPOINT + 'updateUser', body, headers);
  }
  getUserRole() {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.USER_ENDPOINT + 'getAllUser', [], headers);
  }
  uploadAttachments(body: any, property_id: number) {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.PROPERTY_ENDPOINT + '/upload/property/' + `${property_id}`, body, headers);
  }



  getPropertyImage(data: any) {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.PROPERTY_ENDPOINT + 'getImgById', data, headers);
  }

  deletePropertyImage(data: any) {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.PROPERTY_ENDPOINT + 'deleteimg', data, headers);
  }
  postBlogData(data: any) {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.BLOG_ENDPOINT + 'add', data, headers);
  }
  getBlogData() {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.BLOG_ENDPOINT + 'getAll', [], headers);
  }
  activateClient(data: any) {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.CLIENT_ENDPOINT + 'create-client', data, headers);
  }
  getOrders(body) {
    const headers = this.getRequestHeaders(this._sharedService.isloggedin);
    return this._http.post(environment.ORDER_ENDPOINT, body, headers);
  }
  //get form data service method
  getOrderData(id) {
    const headers = this.getRequestHeaders(true);
    return this._http.post(environment.CLIENT_FORM_ENDPOINT + 'getOrder', id, headers);
  }
  //upload form doc service
  uploadClientattachments(body: any) {
    return this._http.post(environment.CLIENT_DOC_UPLOAD, body);
  }
  postClientDetail(body: any) {
    const headers = this.getRequestHeaders(true);
    return this._http.post(environment.CLIENT_FORM_ENDPOINT + 'post', body, headers);
  }
  getClientDetail(body: any): Observable<any> {
    const headers = this.getRequestHeaders(true);
    return this._http.post(environment.CLIENT_FORM_ENDPOINT + 'get', body, headers);

  }
  saveClientDraft(body: any) {
    const headers = this.getRequestHeaders(true);
    return this._http.post(environment.CLIENT_FORM_ENDPOINT + 'update', body, headers);
  }
  updateorderStatus(body: any) {
    const headers = this.getRequestHeaders(true);
    return this._http.post(environment.CLIENT_FORM_ENDPOINT + 'change-status', body, headers);
  }

  //get active client list
  getactiveclientList(body: any) {
    const headers = this.getRequestHeaders(true);
    return this._http.post(environment.CLIENT_ENDPOINT + 'get', body, headers);
  }
  //send email to clients
  sendEmail(body: any) {
    const headers = this.getRequestHeaders(true);
    return this._http.post(environment.CLIENT_ENDPOINT + 'send-email', body, headers);
  }
  // get client transaction
  getTransactionData(body){
    const headers = this.getRequestHeaders(true);
    return this._http.post(environment.CLIENT_FORM_ENDPOINT + 'get-transaction', body, headers);
  }
}


