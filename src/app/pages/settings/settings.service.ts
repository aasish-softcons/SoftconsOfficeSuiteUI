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
  public getCompanyUrl = GlobalVariable.BASE_API_URL + 'getCompanyListById/';
  public updateCompanyUrl = GlobalVariable.BASE_API_URL + 'updateCompany';

 public getDepartmentUrl =  GlobalVariable.BASE_API_URL + 'getAllDepartmentByCId/';
 public addDepartmentUrl =  GlobalVariable.BASE_API_URL + 'addDepartment';
 public updateDepartmentUrl =  GlobalVariable.BASE_API_URL + 'updateDepartment';
 public deleteDepartmentUrl =  GlobalVariable.BASE_API_URL + 'deleteDepartment';
  
   public getClientUrl =  GlobalVariable.BASE_API_URL +'getAllClientByCId/';
   public addClientUrl =  GlobalVariable.BASE_API_URL + 'addClients';
   public deleteClientUrl =  GlobalVariable.BASE_API_URL + 'deleteClient';
   public updateClientUrl =  GlobalVariable.BASE_API_URL + 'updateClients';
  
  public getTeamUrl =  GlobalVariable.BASE_API_URL +'getAllTeamByCId/';
  public addTeamUrl =  GlobalVariable.BASE_API_URL + 'addTeams';
  public updateTeamUrl =  GlobalVariable.BASE_API_URL + 'updateTeam';
  public deleteTeamUrl =  GlobalVariable.BASE_API_URL + 'deleteTeam';
  
  public getTagUrl =  GlobalVariable.BASE_API_URL +'getAllTagsList';
  public addTagUrl =  GlobalVariable.BASE_API_URL + 'addTags';

  public GetProjectUrl = GlobalVariable.BASE_API_URL + 'getCompanyListById/' + this.companyId;
  public AddProjectUrl = GlobalVariable.BASE_API_URL + 'addProject';
  public UpdateProjectUrl = GlobalVariable.BASE_API_URL + 'updateProject';

// function to get company details
  getCompany(companyId): Observable<SettingsComponent[]> {


    //let companyId = id;
// console.log(this.LoginUrl1);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });

    return this.http.get(this.getCompanyUrl + companyId, options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }


 //function to update company details
updateCompany(companyData): Observable<SettingsComponent[]> {
//    let companyDetails = companyData;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });

 //console.log(companyDetails);
    return this.http.post(this.updateCompanyUrl, companyData, options)
                    .map(this.extractData)
                    .catch(this.handleError);

}
  
  

   getDepartment(companyId): Observable<SettingsComponent[]> {
 //let companyId =localStorage.getItem("companyID")
console.log(this.getDepartmentUrl)

    //let companyId = id;
   //console.log("inside  get department service" +companyId);
   // let clientDetails = clientData;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });
  
  //console.log(clientDetails);
    return this.http.get(this.getDepartmentUrl+companyId , options)
                    .map(this.extractData)
                    .catch(this.handleError);
          
          
 
  }
  

  
//function to add department
   addDepartment(departmentData): Observable<SettingsComponent[]> {
 //let companyId =localStorage.getItem("companyID")
  

    //let companyId = id;
   console.log("inside service");
    
       let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });

 console.log("anjana"+ JSON.stringify(departmentData));
    return this.http.post(this.addDepartmentUrl, departmentData, options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }
  
  
// function to update the department
 updateDepartment(departmentData): Observable<SettingsComponent[]> {
 //let companyId =localStorage.getItem("companyID")
  

    //let companyId = id;
   console.log("inside service");
    
       let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });

 console.log("anjana"+ JSON.stringify(departmentData));
    return this.http.post(this.updateDepartmentUrl, departmentData, options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }
  
  
  
  //function to delete department

 deleteDepartment(departmentData): Observable<SettingsComponent[]> {
 //let companyId =localStorage.getItem("companyID")
  

    //let companyId = id;
   console.log("inside service");
    
       let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });

 console.log("anjana"+ JSON.stringify(departmentData));
    return this.http.post(this.deleteDepartmentUrl, departmentData, options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }
  
  
  
 //function to get client list
   getClient(companyId): Observable<SettingsComponent[]> {
 //let companyId =localStorage.getItem("companyID")
console.log(this.getDepartmentUrl)

    //let companyId = id;
   console.log("inside  get client service" +companyId);
   // let clientDetails = clientData;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });
  
  //console.log(clientDetails);
    return this.http.get(this.getClientUrl+companyId , options)
                    .map(this.extractData)
                    .catch(this.handleError);
          
          
 
  }


//function to add client/customer
addClient(clientData): Observable<SettingsComponent[]> {
 //let companyId =localStorage.getItem("companyID")
  

    //let companyId = id;
   console.log("inside service");
    
       let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });

 console.log("anjana"+ JSON.stringify(clientData));
    return this.http.post(this.addClientUrl, clientData, options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }  
  
  // function to update client
   updateClient(clientData): Observable<SettingsComponent[]> {
 //let companyId =localStorage.getItem("companyID")
  

    //let companyId = id;
   //console.log("inside service");
    
       let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });

 //console.log("anjana"+ JSON.stringify(clientData));
    return this.http.post(this.updateClientUrl, clientData, options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }
  
  
  // function to delete client
  
  deleteClient(clientData): Observable<SettingsComponent[]> {
 //let companyId =localStorage.getItem("companyID")
  

    //let companyId = id;
   //console.log("inside service");
    
       let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });

 //console.log("anjana"+ JSON.stringify(clientData));
    return this.http.post(this.deleteClientUrl, clientData, options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }
  
  
  
  //function to get team by company Id
  
   getTeam(companyId): Observable<SettingsComponent[]> {
 //let companyId =localStorage.getItem("companyID")
console.log(this.getDepartmentUrl)

    //let companyId = id;
   //console.log("inside  get department service" +companyId);
   // let clientDetails = clientData;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });
  
  //console.log(clientDetails);
    return this.http.get(this.getTeamUrl+companyId , options)
                    .map(this.extractData)
                    .catch(this.handleError);
          
          
 
  }
  
  
  // function to add team 
 
 addTeam(teamData): Observable<SettingsComponent[]> {

     
       let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });

 console.log("anjana"+ JSON.stringify(teamData));
    return this.http.post(this.addTeamUrl, teamData, options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }  
  
  
  
  
  // function to update the team
 updateTeam(teamData): Observable<SettingsComponent[]> {
 
    
       let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });

 console.log("anjana"+ JSON.stringify(teamData));
    return this.http.post(this.updateTeamUrl, teamData, options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }
  
  
  //function to delete the team
  


 deleteTeam(teamData): Observable<SettingsComponent[]> {

    
       let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });

 console.log("anjana"+ JSON.stringify(teamData));
    return this.http.post(this.deleteTeamUrl,teamData, options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }
  
  
  // function to get the tag list
 //function to add tag
  addTag(tagData): Observable<SettingsComponent[]> {

     
       let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' });
  let options = new RequestOptions({ headers: headers });

 console.log("anjana"+ JSON.stringify(tagData));
    return this.http.post(this.addTagUrl, tagData, options)
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
