import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { SettingsService } from '../settings/settings.service';
import { MenuComponent } from '../menu/menu.component';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { DatePipe } from '@angular/common';
import {sortPipe} from '../settings//filter.pipe';



@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  //styleUrls: ['./settings.component.css']
  
  providers: [ SettingsService ]
 
})
export class SettingsComponent implements OnInit {
   disabled=false;
   date=new Date();
  yesterday = new Date();
  yesterdaysFormattedDate;
  todaydayFormattedDate;
  emailpattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/";
  
  isDisplay = true;
  errorMessage: string;
  name: string;
  company: SettingsComponent[];
  mode = 'Observable';
  parameter1: any;
  selectedItem: any;
  text: string;
  currentUser: any;
  companyId: any;
  userId:any;
  companyData: any[];
  company_name: any;
  contact_person: any;
  address: any;
  phone_number: any;
  email_id: any;
  subscription_date: any;
  expiry_date: any;
  asset_limit: any;
  user_limit: any;
  license_version: any;
  license_number: any;
  license_count: any;
  version: any;
  amount_paid: any;
  companyInfo:string;
  companyAlertSuccess=false;
  companyAlertFail=false;
  sprintDays:number;
  
  departmentData:any[];
  department:SettingsComponent[];
    editRowId: any;
  departmentId:number;
  department_name:string;
  head_of_the_department:string;
  location:string;
  functions:string;
  members:number;
  departmentInfo:string;
   showalertsuccess=false;
  showalertfail=false;
  
  client:SettingsComponent[];
  customerName:string;
  clientUrl:string;
  clientPan:string;
  clientGstn:string;
  clientRegisteredAddress:string;
  clientMailingAddress:string;
  clientOwner:string;
  clientContactperson:string;
  clientPhone:number;
  clientEmail:string;
  clientInfo:string;
  showClientSuccess=false;
  showClientFail=false;
  clientData:any[];
  clientId:number;
  updateClientSuccess=false;
  updateClientFail=false;
  deleteClientSuccess=false;
  deleteClientFail=false;
  clientEditId:any;
  clientDeleteId:any;
  client_name:string;
  client_url:string;
  client_pan:string;
  client_gstn:string;
  client_registered_address:string;
  client_mailing_address:string;
  client_managing_director:string;
  client_contact_person:string;
  client_phone_number:string;
  client_email_id:string;
  clientUpdateDisabled=false;
  
  team:SettingsComponent[];
  teamData:any[];
  teamActionSuccess=false;
  teamActionFail=false;
  teamInfo:string;
  teams_name:any;
  team_lead:any;
  team_location:any;
  team_function:any;
  team_members:any;
  teamEditindex:any;
  
  tagData:any[];
  tag:SettingsComponent[];
  tag_name:any;
  tag_description:string;
  tagActionSuccess=false;
  tagActionFail=false;
  tagInfo:string;

  
  
  
  

  projectData: any[];
  customer_name: any;
  project_name: any;
  start_date: any;
  end_date: any;
  billable_type: any;
  billing_type: any;
  team_name: any;

  constructor(private settingsService: SettingsService, public fb: FormBuilder, private router: Router) { 
      this.currentUser= JSON.parse(localStorage.getItem("user"));
        this.companyId=this.currentUser[0].company_id;
          this.userId=this.currentUser[0].id;  
  }

 public companyForm = this.fb.group({
     company_name: [""],
     contact_person: ["", Validators.required],
     address: ["", Validators.required],
     phone_number: ["", Validators.required],
     email_id: [""],
    subscription_date: [""],
     expiry_date: [""],
     asset_limit: [""],
    user_limit: [""],
     license_version: [""],
     license_number: [""],
    license_count: [""],
    version: [""],
    amount_paid: [""]
});

   public projectForm = this.fb.group({
     customer_name: ["", Validators.required],
     project_name: ["", Validators.required],
     start_date: ["", Validators.required],
     end_date: ["", Validators.required],
     billable_type: ["", Validators.required],
     billing_type: ["", Validators.required],
     team_name: ["", Validators.required]
});
  
   public clientForm = this.fb.group({
     client_company_name: ["", Validators.required],
     
    client_url: ["", Validators.required],
     client_pan: ["",Validators.required],
     client_gstn: ["", Validators.required],
    registered_address: ["", Validators.required],
     mailing_addresss: ["", Validators.required],
     client_owner: ["", Validators.required],
    contact_person: ["", Validators.required],
    phone_number: ["", Validators.required],
    email_address: ["", [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
}); 
  
  public tagForm=this.fb.group({
  tag_name:["",Validators.required],
  tag_description:["",Validators.required]  
  })
  

  getCompany() {
 console.log("inside get company");
  this.currentUser= JSON.parse(localStorage.getItem("user"));
  this.companyId=this.currentUser[0].company_id;
  console.log(this.companyId);
  localStorage.setItem('companyID', this.companyId);

      this.settingsService.getCompany(this.companyId)
                     .subscribe(
                      company => {

              console.log(JSON.stringify(company));

              if(company) {
                //localStorage.setItem('company', JSON.stringify(company));
                //this.currentUser= JSON.parse(localStorage.getItem("user"));
                //console.log(this.currentUser);
               
                this.companyData=company;
                 this.sprintDays=this.companyData[0].sprint_days;
                console.log(this.companyData);
              }
              else{
                console.log("No Data Found");
              }

               },
                error =>  this.errorMessage = <any>error);
  }


  ngOnInit() {
   console.log("settings");
     this.getCompany();
    
    this.getDepartment();
    this.getClient();
     this.getTeam();
    this.getTags();
     
 // console.log(this.companyId);
  localStorage.setItem('companyID', this.companyId);
    //getting previous day date
   this.yesterday.setDate(this.yesterday.getDate()-1);
    this.date.setDate(this.date.getDate()+1);
     console.log(this.yesterday);
   //converting yesterday to YYYY-MM-dd HH:mm:ss format 
   let yesterdaysday = this.yesterday.getDate();
let yesterdaysmonthIndex = this.yesterday.getMonth();
let yesterdaysyear =  this.yesterday.getFullYear();
let yesterdaysminutes =  this.yesterday.getMinutes();
let yesterdayshours =  this.yesterday.getHours();
let yesterdaysseconds =  this.yesterday.getSeconds();
// this.yesterdaysFormattedDate = yesterdaysday+"-"+(yesterdaysmonthIndex+1)+"-"+yesterdaysyear+" "+ yesterdayshours+":"+yesterdaysminutes+":"+yesterdaysseconds;
  this.yesterdaysFormattedDate = yesterdaysyear+"-"+(yesterdaysmonthIndex+1)+"-"+yesterdaysday+" "+ yesterdayshours+":"+yesterdaysminutes+":"+yesterdaysseconds;
  //converting today to YYYY-MM-dd HH:mm:ss format  
      let todayday = this.date.getDate();
let todaydaymonthIndex = this.date.getMonth();
let todaydayyear =  this.date.getFullYear();
let todaysday =  this.date.getMinutes();
let todaydayhours =  this.date.getHours();
let todaydayseconds =  this.date.getSeconds();


  this.todaydayFormattedDate = todaydayyear+"-"+(todaydaymonthIndex+1)+"-"+todayday+" "+ todaysday+":"+todaydayhours+":"+todaydayseconds;
    
   //console.log(myFormattedDate);
  }

updateCompany(event) {
 //console.log("anjana"+this.newtext);

 this.isDisplay = true;
 this.text = this.name;
console.log(this.companyForm.value['contact_person']);
   //console.log(this.companyForm.value['contact_person']);
  this.currentUser = JSON.parse(localStorage.getItem("user"));
//let companyData = { CompanyInfo:JSON.stringify({id:1,contact_person:"Shwetha", address:"Sullia",phone_no:"9481015738",email_id:"shwetha.n@softcons.net",last_updated:"2018-02-16 00:00:00",updated_by:"Shwetha",sprint_days:15,subscription_date:"2018-02-16 00:00:00",company_name:"Shwetha Innovations",nominal_flag:1 }) };
let companyData = { CompanyInfo: JSON.stringify({id: this.companyId, contact_person: this.companyForm.value['contact_person'], address: this.companyForm.value['address'], phone_no: this.companyForm.value['phone_number'], email_id: this.companyForm.value['email_id'], last_updated: '', updated_by: this.userId, sprint_days: this.sprintDays, subscription_date: '', company_name: this.companyForm.value['company_name'], nominal_flag: 1 }) };
console.log(companyData);

      this.settingsService.updateCompany(companyData)
                     .subscribe(
                      company => {

              if(company["message"]=="You are Successfully Updated a Company") {
                //console.log( company);
                this.disabled=true;
               this.companyAlertSuccess=true;
                this.companyInfo="Company Updated Successfully";
                localStorage.setItem('company', JSON.stringify(company));
                this.currentUser= JSON.parse(localStorage.getItem("user"));
                setTimeout(function() {
              this.companyAlertSuccess=false;
       
               }.bind(this), 3000)
                
              //this.router.navigate(['menu']);
              }
              else{
              //this.error=true;
                this.companyInfo="Error occured while updating department ";
                 this.companyAlertFail=true;
                setTimeout(function() {
              this.companyAlertFail=false;
       
               }.bind(this), 3000)

              }

               },
                       error =>  this.errorMessage = <any>error);
}
  

// function to get department list
getDepartment(){

  console.log(this.companyId);
  this.settingsService.getDepartment(this.companyId)
                     .subscribe(
                     department => {
           
            console.log("inside get deparment component service call");
              console.log(JSON.stringify(department));
              
              if(department)
              
              {
                
              this.departmentData=department;
              
               
              }
              else{
              
                            
              }
              
               },
                       error =>  this.errorMessage = <any>error);
 }
  
  



// function to add department
addDepartment() {
   this.showalertsuccess=false;
  this.showalertfail=false;
let departmentData={ DepartmentInfo:JSON.stringify({company_id:this.companyId,department_name:this.department_name,department_head:this.head_of_the_department,department_location:this.location,department_function:this.functions,department_members:this.members,date_created:'',created_by:this.userId,start_date: this.yesterdaysFormattedDate,end_date:'2020-03-16 12:13:23'}) };
 console.log(departmentData);
  console.log(this.department_name);
  if(this.department_name==""||this.head_of_the_department==""||this.location==""||this.functions==""||this.members==null){
  alert("Please enter all the fields");
  
  }
  else{
     this.settingsService.addDepartment(departmentData)
        
                     .subscribe(
                     department => {
            console.log("inside component");
              console.log(JSON.stringify(department));
              
              if(department["message"]==="Department created successfully")
              
              {
              this.showalertsuccess=true;
           this.departmentInfo="Department added successfully";
                this. department_name="";
                this.head_of_the_department="";
                this.location="";
                this.functions="";
                this.members=null;
                this.getDepartment();
                 setTimeout(function() {
       this.showalertsuccess = false;
       
   }.bind(this), 3000)
                
                
              }
              else{
                this.showalertfail=true;
                      this.departmentInfo="Error occured while adding department";    
                setTimeout(function() {
       this.showalertfail = false;
       
   }.bind(this), 3000)  
              }
              
               },
                      error =>  this.errorMessage = <any>error);  
  
  }
     
  }
  
  
  
 //when user clicks edit
editDepartment(row_no){
  this.editRowId=row_no;
  
}  

updateDepartment(id,name,head,location,functions,member){
   
  this.departmentId=id;
  let departmentData={DepartmentInfo:JSON.stringify({id:id,company_id:this.companyId,department_name:name,department_head:head,department_location:location,department_function:functions,department_members:member,last_updated:'',updated_by:this.userId,start_date: this.yesterdaysFormattedDate,end_date:'2020-03-16 12:13:23'}) };
 console.log(departmentData);
   if(name==""||head==""||location==""||functions==""||member==null){
  alert("Please enter all the fields");
  
  }
  else{
    this.editRowId="";
   this.settingsService.updateDepartment(departmentData)
                     .subscribe(
                     department => {
            console.log("inside component");
              console.log(JSON.stringify(department));
               
          
              if(department["message"]=="You are successfully updated the Department")
              
              {
               
              this.showalertsuccess=true;
               this.departmentInfo="Department updated successfully";
               
                
                setTimeout(function() {
       this.showalertsuccess = false;
       
   }.bind(this), 3000)
              }
              else{
              
                   this.showalertfail=true;
               this.departmentInfo="Department update failed";      
                setTimeout(function() {
          this.showalertfail = false;
       
         }.bind(this), 3000) 
                    
              }
              
               },
                      error =>  this.errorMessage = <any>error);  
  }
   }
      
      
      
 deleteDepartment(id,name,head,location,functions,member){
   this.departmentId=id;
 let departmentData={DepartmentInfo:JSON.stringify({id:this.departmentId,company_id:this.companyId,department_name:name,department_head:head,department_location:location,department_function:functions,department_members:member,last_updated:'',updated_by:this.userId,start_date:this.yesterdaysFormattedDate,end_date:'2020-03-16 12:13:23'}) };
   
   this.settingsService.deleteDepartment(departmentData)
                     .subscribe(
                     department => {
            console.log("inside component");
              console.log(JSON.stringify(department));
               
          
              if(department["message"]=="You are successfully made Inactive")
              
              {
               
              this.showalertsuccess=true;
               this.departmentInfo="Department deleted successfully";
                 this.getDepartment();
               
                
                setTimeout(function() {
       this.showalertsuccess = false;
       
   }.bind(this), 3000)
              }
              else{
              
                   this.showalertfail=true;
               this.departmentInfo="Department delete failed";      
                setTimeout(function() {
          this.showalertfail = false;
       
         }.bind(this), 3000) 
                    
              }
              
               },
                      error =>  this.errorMessage = <any>error);  
  }

  
  
  getClient(){
    console.log("get client component");
  console.log(this.companyId);
  this.settingsService.getClient(this.companyId)
                     .subscribe(
                     client => {
           
            console.log("inside get client component service call");
              console.log(JSON.stringify(client));
              
              if(client)
              
              {
                
             this.clientData=client;
              
               
              }
              else{
              
                            
              }
              
               },
                       error =>  this.errorMessage = <any>error);
  
  }
 
 
 addClient(){

let clientData={ ClientInfo:JSON.stringify({client_name:this.customerName,company_id:this.companyId,website_url:this.clientUrl,pan:this.clientPan,gstn:this.clientGstn,registered_address:this.clientRegisteredAddress,managing_director:this.clientOwner,mailing_address:this.clientMailingAddress,contact_person:this.clientContactperson,phone_number:this.clientPhone,email_id:this.clientEmail,status:1,date_created:'',created_by:this.userId,start_date: this.yesterdaysFormattedDate,end_date:'2020-03-16 12:13:23'}) };
 
 console.log(clientData);
  console.log(this.department_name);

     this.settingsService.addClient(clientData)
        
                     .subscribe(
                     client => {
            console.log("inside component");
              console.log(JSON.stringify(client));
              
              if(client["message"]==="Clients are added Successfully")
              
              {
              this.showClientSuccess=true;
           this.clientInfo="Customer added successfully";
                this.getClient();
                 this.clientForm.reset();
                
               
               
                 setTimeout(function() {
       this.showClientSuccess = false;
       
   }.bind(this), 3000)
                
                
              }
              else{
               this.showClientFail=true;
                      this.clientInfo="Error occured while adding customer";    
                setTimeout(function() {
       this.showClientFail = false;
       
   }.bind(this), 3000)  
              }
              
               },
                      error =>  this.errorMessage = <any>error);  
  

     
 
 }

  
 // function to reset client form
  resetClientForm(){
  
  this.clientForm.reset();
  }
  
  
  // function when user clicks edit client button
  editClient(client_no,clients){
  this.clientEditId=client_no;
   this.client_name=clients.client_name;
    this.client_url=clients.website_url;
    this.client_pan=clients.pan;
    this.client_gstn=clients.gstn;
    this.client_registered_address=clients.registered_address;
    this.client_managing_director=clients.managing_director;
    this.client_mailing_address=clients.mailing_address;
    this.client_contact_person=clients.contact_person;
    this.client_phone_number=clients.phone_number;
    this.client_email_id=clients.email_id;
    
    
  

}
  
  
  // function to update client
  
  updateClient(clients){
  console.log(clients);
   if(this.client_name===''||this.client_url===''||this.client_pan===''||this.client_gstn===''||this.client_registered_address===''||this.client_managing_director===''||this.client_mailing_address===''||this.client_contact_person===''||this.client_phone_number===null||this.client_email_id==='')
     {
 alert("Please enter all fields");
   }
    else if(!/^[0-9]*$/.test(this.client_phone_number)){
    alert("Please enter valid Phone number");
   }
    else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(this.client_email_id)) {
  alert("Please enter valid EmailId");
}
    
    else{
   let clientData={ ClientInfo:JSON.stringify({id:clients.id,client_name:this.client_name,company_id:clients.company_id,website_url:this.client_url,pan: this.client_pan,gstn:this.client_gstn,registered_address:this.client_registered_address,managing_director: this.client_managing_director,mailing_address:this.client_mailing_address,contact_person:this.client_contact_person,phone_number:this.client_phone_number,email_id:this.client_email_id,status:1,last_updated:'',updated_by:this.userId,start_date: this.yesterdaysFormattedDate,end_date:'2020-03-16 12:13:23'}) };
     console.log(clientData);
   
   this.settingsService.updateClient(clientData)
                     .subscribe(
                     client => {
            console.log("inside component");
               console.log(JSON.stringify(client));
               
          
              if(client["message"]=="You are successfully updated")
              
              {
               
             this.updateClientSuccess=true;
               this.clientInfo="Client updated successfully";
                 this.getClient();
               
                
                setTimeout(function() {
       this.updateClientSuccess = false;
        this.clientEditId='';
   }.bind(this), 3000)
              }
              else{
              
                   this.updateClientFail=true;
               this.clientInfo="Client update failed";      
                setTimeout(function() {
          this.updateClientFail = false;
        this.clientEditId='';
         }.bind(this), 3000) 
                    
              }
               
               },
                      error =>  this.errorMessage = <any>error);  
   }
  
  }

  
  // function to delete client
  deleteClient(client_no,clients){
    
    this.clientDeleteId=client_no;
 console.log(clients);
 let clientData={ ClientInfo:JSON.stringify({id:clients.id,client_name:clients.client_name,company_id:clients.company_id,website_url:clients.website_url,pan:clients.pan,gstn:clients.gstn,registered_address:clients.registered_address,managing_director:clients.managing_director,mailing_address:clients.mailing_address,contact_person:clients.contact_person,phone_number:clients.phone_number,email_id:clients.email_id,status:1,date_created:'',created_by:this.userId,start_date: this.yesterdaysFormattedDate,end_date:'2020-03-16 12:13:23'}) };
     console.log(clientData);
   
   this.settingsService.deleteClient(clientData)
                     .subscribe(
                     client => {
            console.log("inside component");
              // console.log(JSON.stringify(client));
               
          
              if(client["message"]=="You are successfully updated")
              
              {
               
             this.deleteClientSuccess=true;
               this.clientInfo="Client deleted successfully";
			   this.getClient();
               
               
                
                setTimeout(function() {
       this.deleteClientSuccess = false;
       
   }.bind(this), 3000)
              }
              else{
              
                   this.deleteClientFail=true;
               this.clientInfo="Client delete failed";   
                 this.getClient();   
                setTimeout(function() {
          this.deleteClientFail = false;
       
         }.bind(this), 3000) 
                    
              }
              
               },
                      error =>  this.errorMessage = <any>error);  
     
  }
  
  
  // function to get the team list
  getTeam(){
    console.log("get team component");
  console.log(this.companyId);
  this.settingsService.getTeam(this.companyId)
                     .subscribe(
                     team => {
           
            console.log("inside get client component service call");
              console.log(JSON.stringify(team));
              
              if(team)
              
              {
                
             this.teamData=team;
              
               
              }
              else{
              
                            
              }
              
               },
                       error =>  this.errorMessage = <any>error);
  
  }
  
  
  
// function to add team
addTeam() {
 
let teamData={ TeamInfo:JSON.stringify({team_name:this.teams_name,status:1,company_id:this.companyId,date_created:'',created_by:this.userId,start_date: this.yesterdaysFormattedDate,end_date:'2020-03-16 12:13:23',location:this.team_location,function:this.team_function,teamlead:this.team_lead,members:this.team_members}) };
 console.log(teamData);
  
  if(this.teams_name==""||this.team_lead==""||this.team_location==""||this.team_function==""||this.team_members==null){
  alert("Please enter all the fields");
  
  }
  else{
     this.settingsService.addTeam(teamData)
        
                     .subscribe(
                     team => {
            console.log("inside component");
              console.log(JSON.stringify(team));
              
              if(team["message"]==="Teams are created successfully")
              
              {
              this.teamActionSuccess=true;
           this.teamInfo="Team added successfully";
                this. teams_name="";
                this.team_lead="";
                this.team_location="";
                this.team_function="";
                this.team_members=null;
                this.getTeam();
                 setTimeout(function() {
       this.teamActionSuccess = false;
       
   }.bind(this), 3000)
                
                
              }
              else{
                this.teamActionFail=true;
                      this.teamInfo="Error occured while adding team";    
                setTimeout(function() {
       this.teamActionFail = false;
       
   }.bind(this), 3000)  
              }
              
               },
                      error =>  this.errorMessage = <any>error);  
  
  }
     
  }
  
  
  
  
 //when user clicks edit
editTeam(row_no){
  this.teamEditindex=row_no;
  
}  

updateTeam(id,name,lead,locations,functions,member){
   
  // this.teamId=id;
  let teamtData={TeamInfo:JSON.stringify({id:id,team_name:name,status:1,company_id:this.companyId,last_updated:'',updated_by:this.userId,start_date: this.yesterdaysFormattedDate,end_date:'2020-03-16 12:13:23',location:locations,function:functions,teamlead:lead,members:member}) };
 console.log(teamtData);
   if(name==""||lead==""||locations==""||functions==""||member==null){
  alert("Please enter all the fields");
  
  }
  else{
    this.teamEditindex="";
   this.settingsService.updateTeam(teamtData)
                     .subscribe(
                     team => {
            console.log("inside component");
              console.log(JSON.stringify(team));
               
          
              if(team["message"]=="You are successfully updated")
              
              {
               
              this.teamActionSuccess=true;
               this.teamInfo="Team updated successfully";
               
                
                setTimeout(function() {
       this.teamActionSuccess = false;
       
   }.bind(this), 3000)
              }
              else{
              
                   this.teamActionFail=true;
               this.teamInfo="Team update failed";      
                setTimeout(function() {
          this.teamActionFail = false;
       
         }.bind(this), 3000) 
                    
              }
              
               },
                      error =>  this.errorMessage = <any>error);  
  }
   }
      
      
      
 deleteTeam(id,name,lead,location,functions,member){
   // this.teamId=id;
 let teamData={TeamInfo:JSON.stringify({id:id,team_name:name,status:1,company_id:this.companyId,last_updated:'',updated_by:this.userId,start_date: this.yesterdaysFormattedDate,end_date:'2020-03-16 12:13:23',location:location,function:functions,teamlead:lead,members:member}) };
   
   this.settingsService.deleteTeam(teamData)
                     .subscribe(
                     team => {
            console.log("inside component");
              console.log(JSON.stringify(team));
               
          
              if(team["message"]=="You are successfully made Inactive")
              
              {
               
              this.teamActionSuccess=true;
               this.teamInfo="Team deleted successfully";
                 this.getTeam();
               
                
                setTimeout(function() {
       this.teamActionSuccess = false;
       
   }.bind(this), 3000)
              }
              else{
              
                   this.teamActionFail=true;
               this.teamInfo="Team delete failed";      
                setTimeout(function() {
          this.teamActionFail = false;
       
         }.bind(this), 3000) 
                    
              }
              
               },
                      error =>  this.errorMessage = <any>error);  
  this.getTeam();
  }

  // function to get list of tags
getTags(){
  
  this.settingsService.getTags()
                     .subscribe(
                     tag => {
           
            console.log("inside get client component service call");
              console.log(JSON.stringify(tag));
              
              if(tag)
              
              {
                
             this.tagData=tag;
              
               
              }
              else{
              
                            
              }
              
               },
                       error =>  this.errorMessage = <any>error);
  
  }

  
  
// function to add tags
addTag() {
 
let tagData={TagInfo:JSON.stringify({tag_name:this.tag_name,tag_description:this.tag_description,date_created:'',created_by:this.userId,start_date: this.yesterdaysFormattedDate,end_date:'2020-03-16 12:13:23'}) };
 console.log(tagData);
  
  

     this.settingsService.addTag(tagData)
        
                     .subscribe(
                     tag => {
            console.log("inside component");
              console.log(JSON.stringify(tag));
              
              if(tag["message"]==="Tags are created successfully")
              
              {
              this.tagActionSuccess=true;
           this.tagInfo="Tag added successfully";
              this.getTags();
                 setTimeout(function() {
       this.tagActionSuccess = false;
       
   }.bind(this), 3000)
                
                
              }
              else{
                this.tagActionFail=true;
                      this.tagInfo="Error occured while adding tag";    
                setTimeout(function() {
       this.tagActionFail = false;
       
   }.bind(this), 3000)  
              }
              
               },
                      error =>  this.errorMessage = <any>error);  
  
 
     
  }
  
  
  // function to delete tag
deleteTag(tags) {
 

 
let tagData={TagInfo:JSON.stringify({id:tags.id}) };
 console.log(tagData);
  
  

     this.settingsService.deleteTag(tagData)
        
                     .subscribe(
                     tag => {
            console.log("inside component");
              console.log(JSON.stringify(tag));
               this.getTags();
              if(tag["message"]==="Tags are created successfully")
              
              {
              this.tagActionSuccess=true;
           this.tagInfo="Tag added successfully";
             
                 setTimeout(function() {
       this.tagActionSuccess = false;
       
   }.bind(this), 3000)
                
                
              }
              else{
                this.tagActionFail=true;
                      this.tagInfo="Error occured while adding tag";    
                setTimeout(function() {
       this.tagActionFail = false;
       
   }.bind(this), 3000)  
              }
              
               },
                      error =>  this.errorMessage = <any>error);  
  
 
     
  }
  
  
  
  



}
