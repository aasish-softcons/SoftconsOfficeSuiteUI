import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Injectable()
export class LoginService {
  selectedItem: any;
  //loginData: any[];
    public LoginUrl = 'http://106.51.72.111:8083/SoftconsSuiteRestService/v1/login';  // URL to web API
  //alert(heroesUrl1);
  constructor( private http: Http, private router: Router) {
    // If we navigated to this page, we will have an item available as a nav param
    //this.selectedItem = navParams.get('item');
  //alert("Newuser1! -- "+selectedItem);
  }
  //alert(localStorage.getItem('MakeID'));

  doLogin(loginData): Observable<LoginComponent[]> {
    let loginDetails = loginData;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });
  //alert("GetHeroes");
  console.log(loginDetails);
    return this.http.post(this.LoginUrl, { LoginInfo: JSON.stringify(loginDetails) }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
 // console.log(loginDetails);
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
      errMsg = 'Hello'+err;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
