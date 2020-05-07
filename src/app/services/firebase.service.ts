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

  public getCurrentPromotionId() : string {
    var d = new Date();
    var currentMonth = d.getMonth().toString();
    var currentYear = d.getFullYear().toString();

    return currentMonth + currentYear;
  }

  public getCurrentPromotionOfShop(id : string) {
    console.log("restaurant id : ", id)
    console.log("promotionId ", this.getCurrentPromotionId());
    return firestore.collection("restaurants").doc(id).collection("promotions").doc(this.getCurrentPromotionId());
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
