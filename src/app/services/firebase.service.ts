import { Injectable } from '@angular/core';

const firebase = require("nativescript-plugin-firebase");
import { firestore } from "nativescript-plugin-firebase";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private restaurantName : string = 'albacio'; 

  constructor() { 
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

  ngOnInit() {

  }


  public getDish(docId: string) : firestore.DocumentReference{
    return firestore.collection("restaurants").doc(this.restaurantName).collection("dishes").doc(docId);
  }

  public getDishes() : firestore.CollectionReference {
    return firestore.collection("restaurants").doc(this.restaurantName).collection("dishes");
  }

  public getShop(docId : string) : firestore.DocumentReference {
    return firestore.collection("restaurants").doc(docId);
  }

  public getShops() : firestore.CollectionReference {
    return firestore.collection("restaurants");
  }

}
