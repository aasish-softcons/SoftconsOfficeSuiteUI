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
  isDisplay=true;
  errorMessage: string;
  name:string;
  company: SettingsComponent[];
  mode = 'Observable';
  parameter1 : any;
  selectedItem: any;
  //loginData: any[];
  text:string;
  currentUser:any;
  companyId:any;
   companyData:any[];
  constructor(private settingsService: SettingsService, public fb: FormBuilder, private router: Router) { }

 public companyForm = this.fb.group({
     company_name: ["", Validators.required],
     contact_person: ["", Validators.required],
     address: ["", Validators.required],
     phone_number: ["", Validators.required],
     email_id: ["", Validators.required],
     subscription_date: ["", Validators.required],
     expiry_date: ["", Validators.required],
     asset_limit: ["", Validators.required],
     user_limit: ["", Validators.required],
     license_version: ["", Validators.required],
     license_number: ["", Validators.required],
     license_count: ["", Validators.required],
     version: ["", Validators.required],
     amount_paid: ["", Validators.required]
});

  getCompany() {

  this.currentUser= JSON.parse(localStorage.getItem("user"));
  this.companyId=this.currentUser[0].company_id;
  console.log(this.companyId);
  localStorage.setItem('companyID', this.companyId);

      this.settingsService.getCompany()
                     .subscribe(
                      company => {

              console.log(JSON.stringify(company));

              if(company) {
                //localStorage.setItem('company', JSON.stringify(company));
                //this.currentUser= JSON.parse(localStorage.getItem("user"));
                //console.log(this.currentUser);
                this.companyData=company;
                console.log("Shwetha the Great");
                console.log(this.companyData);
              }
              else{
                console.log("No Data Found");
              }

               },
                error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getCompany();
  }

 updateCompany(event) {
 //console.log("anjana"+this.newtext);

 this.isDisplay = true;
 this.text = this.name;
console.log(this.companyForm.value['contact_person']);
   //console.log(this.companyForm.value['contact_person']);
  this.currentUser = JSON.parse(localStorage.getItem("user"));
//let companyData = { CompanyInfo:JSON.stringify({id:1,contact_person:"Shwetha", address:"Sullia",phone_no:"9481015738",email_id:"shwetha.n@softcons.net",last_updated:"2018-02-16 00:00:00",updated_by:"Shwetha",sprint_days:15,subscription_date:"2018-02-16 00:00:00",company_name:"Shwetha Inoovations",nominal_flag:1 }) };
let companyData = { CompanyInfo: JSON.stringify({id: 1, contact_person: this.companyForm.value['contact_person'], address: this.companyForm.value['address'], phone_no: this.companyForm.value['phone_number'], email_id: this.companyForm.value['email_id'], last_updated: '2018-02-16 00:00:00', updated_by: "Shwetha", sprint_days: 15, subscription_date: '2018-02-16 00:00:00', company_name: this.companyForm.value['company_name'], nominal_flag: 1 }) };
console.log(companyData);

      this.settingsService.updateCompany(companyData)
                     .subscribe(
                      company => {

              if(company) {
                localStorage.setItem('company', JSON.stringify(company));
                this.currentUser= JSON.parse(localStorage.getItem("user"));
                console.log("Shwetha The Great");
              //this.router.navigate(['menu']);
              }
              else{
                console.log("Shwetha The Sweet");
              //this.error=true;

              }

               },
                       error =>  this.errorMessage = <any>error);
  }



}
