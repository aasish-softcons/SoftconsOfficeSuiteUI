import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LoginService } from '../login/login.service';
import { MenuComponent } from '../menu/menu.component';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css']
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {
  error = false;
  userName: string;
  currentUser: any;
  errorMessage: string;
  login: LoginComponent[];
  mode = 'Observable';
  parameter1: any;
  selectedItem: any;
  loginDetails: any;
  //loginData: any[];
  email: any;
  password: any;
 emailpattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
  constructor(private loginService: LoginService, public fb: FormBuilder, private router: Router) {
    // If we navigated to this page, we will have an item available as a nav param
  //this.parameter1 = navParams.get('item');
    console.log(this.login);
  }
  //alert(selectedItem);
ngOnInit() {

}
 public loginForm = this.fb.group({
     email: ["",[Validators.required, Validators.pattern(this.emailpattern)]],
    password: ["",Validators.required]
});

  doLogin() {
    //console.log(event);
    console.log(this.loginForm.value['email']);
  //model:any
  let loginData = { EmailID: this.loginForm.value['email'], Password: this.loginForm.value['password'] };
  //let loginData = { EmailID:this.email, Password:this.password};
  console.log(loginData);
      this.loginService.doLogin(loginData)
                     .subscribe(
                       login => {
               this.loginDetails =JSON.stringify(login);
               console.log(login["message"]);
              //console.log("Anjana "+this.login);
              //console.log("Anjana "+this.login["message"]);

              if(login["message"]=='Valid Credentials'){
              localStorage.setItem('user', JSON.stringify(login["value"]));
              this.currentUser= JSON.parse(localStorage.getItem("user"));
              this.router.navigate(['menu']);
              //localStorage.setItem('names',"anjana");
              //this.currentUser=localStorage.getItem("names");
              console.log(this.currentUser[0].id);
              this.userName=this.currentUser[0].first_name;
            //this.currentUser= localStorage.getItem("user");
              console.log(this.currentUser);
              }
              else{

              this.error=true;

              }

               },
               error =>  this.errorMessage = <any>error); 
  }

  public createAccount(){

  }

  public forgotPassword(){

  }

}
