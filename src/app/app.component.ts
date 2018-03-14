import { Component } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
   currentUser:any[];
  userName:string;
  email:string;
  address:string;
  phone:string;
  constructor(private router:Router){
   this.currentUser= JSON.parse(localStorage.getItem("user"));
    this.userName=this.currentUser[0].first_name;
    this.email=this.currentUser[0].email_id;
    this.address=this.currentUser[0].user_address;
    this.phone=this.currentUser[0].phone_no;
    
    
  }
  logOut(){
  localStorage.clear();
  this.router.navigate(['']);
}
}
