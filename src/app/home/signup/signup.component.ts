import { Component, OnInit } from '@angular/core';
import { AuthService } from '~/app/services/auth.service';
import { FirebaseService } from '~/app/services/firebase.service';
import { AppUser } from '~/app/shared/appUser';
import { Observable } from 'rxjs';

@Component({
  selector: 'ns-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user : AppUser;
  isConnected : boolean = false;

  constructor(private firebaseService : FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.user.subscribe((user) => {
      console.log("User is now signed in : ", user);
      this.isConnected = true;
      this.user = user;
    });
  }

  signUp() : void {
    this.firebaseService.signUp();
    this.isConnected = true;
  }

  logout() : void {
    this.isConnected = false;
    this.firebaseService.logout();
  }

}
