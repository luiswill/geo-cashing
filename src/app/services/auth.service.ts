import { Injectable } from '@angular/core';
import { FirebaseGoogleLoginOptions, User } from 'nativescript-plugin-firebase';
import { FirebaseService } from './firebase.service';
import { Observable } from 'tns-core-modules/ui/page/page';
import { AppUser, convertToUser } from '../shared/appUser';
import { BehaviorSubject } from 'rxjs';
const firebase = require("nativescript-plugin-firebase");

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  provider;
  

  constructor() { 
   
  }




 

}
