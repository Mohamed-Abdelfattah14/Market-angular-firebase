import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  errorMassage: string;
  constructor(private as:AuthService,private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  sign(form){
    let data: User = form.value
    this.as.signup(data.email,data.password)
    .then(result =>{
      this.errorMassage=''
      this.us.addNewUser(result.user.uid,data.name,data.address).then(()=>{
        this.router.navigate(['/'])
      })
    })
    .catch(err =>{
      this.errorMassage = err.message 
    })
  }
}
