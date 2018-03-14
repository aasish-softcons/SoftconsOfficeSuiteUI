import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { SettingsService } from '../settings/settings.service';
import { MenuComponent } from '../menu/menu.component';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  //styleUrls: ['./settings.component.css']
  providers: [ SettingsService ]
})
export class SettingsComponent implements OnInit {
   disabled=false;
   date=new Date();
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
     
  console.log(this.companyId);
  localStorage.setItem('companyID', this.companyId);
   
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
 console.log("1st inside component");
  this.settingsService.getDepartment()
                     .subscribe(
                     department => {
           
            console.log("inside component");
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
let departmentData={ DepartmentInfo:JSON.stringify({company_id:this.companyId,department_name:this.department_name,department_head:this.head_of_the_department,department_location:this.location,department_function:this.functions,department_members:this.members,date_created:this.date,created_by:this.userId,start_date:this.date,end_date:this.date}) };
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
  let departmentData={DepartmentInfo:JSON.stringify({id:this.departmentId,company_id:this.companyId,department_name:name,department_head:head,department_location:location,department_function:functions,department_members:member,last_updated:'',updated_by:this.userId,start_date:'',end_date:''}) };
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
      





}
