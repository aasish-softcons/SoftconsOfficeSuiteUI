import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import { SettingsComponent } from '../settings/settings.component';
import { GlobalVariable } from '../../global';

@Injectable()
export class SettingsService {
  selectedItem: any;
  currentUser: any;
  //companyId: any;

  constructor(private  http: Http, private router:Router) { }
  companyId = localStorage.getItem("companyID")
  public LoginUrl1 = GlobalVariable.BASE_API_URL + 'getCompanyListById/' + this.companyId;
  public LoginUrl2 = GlobalVariable.BASE_API_URL + 'updateCompany';
// function to get company details
  getCompany(): Observable<SettingsComponent[]> {


    //let companyId = id;
console.log(this.LoginUrl1);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });

    return this.http.get(this.LoginUrl1, options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }


 //function to update company details
updateCompany(companyData): Observable<SettingsComponent[]> {
//    let companyDetails = companyData;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });

 //console.log(companyDetails);
    return this.http.post(this.LoginUrl2, companyData, options)
                    .map(this.extractData)
                    .catch(this.handleError);

}


  private extractData(res: Response) {
    let body = res.json();
  //alert(JSON.stringify(body));
    return body || { };
  }

private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = 'Hello' + err;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}