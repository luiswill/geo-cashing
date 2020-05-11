import { Injectable } from '@angular/core';

import * as firebase from "nativescript-plugin-firebase";
import { firestore, User } from "nativescript-plugin-firebase";

import { getCurrentPromotionId, convertToPromotion, Promotion } from '../shared/promotion';
import { convertToShop, Shop } from '../shared/shop';
import { AppUser, convertToUser } from '../shared/appUser';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private appUser: BehaviorSubject<AppUser>;


  private restaurantName: string = 'albacio';

  constructor() {
    firebase.getCurrentUser().then((user : User) => {
      if(user) {
        this.appUser = new BehaviorSubject<AppUser>(convertToUser(user));
      } else {
        this.appUser = new BehaviorSubject<AppUser>(null);
      }
    })
    console.log("Firebase init..")
    firebase.init({

      // Optionally pass in properties for database, authentication and cloud messaging,
      // see their respective docs.
    }).then(
      () => {
        console.log("firebase.init done");
      },
      error => {
        console.log(`firebase.init error: ${error}`);
      }
    );

  }

  ngOnInit() { }

  get user() {
    return this.appUser.asObservable();
  }

  public getCurrentPromotionOfShop(id: string) {
    return firestore.collection("restaurants").doc(id).collection("promotions").doc(getCurrentPromotionId());
  }

  public getPromotionsOfShop(id: string): firestore.CollectionReference {
    return firestore.collection("restaurants").doc(id).collection("promotions");
  }

  public getDish(docId: string): firestore.DocumentReference {
    return firestore.collection("restaurants").doc(this.restaurantName).collection("dishes").doc(docId);
  }

  public getDishes(): firestore.CollectionReference {
    return firestore.collection("restaurants").doc(this.restaurantName).collection("dishes");
  }

  public getShop(docId: string): firestore.DocumentReference {
    return firestore.collection("restaurants").doc(docId);
  }

  public getShops(): firestore.CollectionReference {
    return firestore.collection("restaurants");
  }

  logout() {
    this.appUser.next(null);
    return firebase.logout();
  }

  signUp() {
    firebase.login({
      type: firebase.LoginType.GOOGLE,
      // Optional 
      googleOptions: {
        //hostedDomain: "mygsuitedomain.com",
        // NOTE: no need to add 'profile' nor 'email', because they are always provided
        // NOTE 2: requesting scopes means you may access those properties, but they are not automatically fetched by the plugin
        scopes: ['https://www.googleapis.com/auth/user.birthday.read']
      }
    }).then(
      (result) => {


        this.appUser.next(convertToUser(result));
        this.storeUserInDatabase(result)
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );
  }

  public storeUserInDatabase(user): void {
    let appUser: AppUser = convertToUser(user);

    firestore.collection("users").doc(appUser.uid).set(appUser);
  }
}
