import { Injectable } from '@angular/core';
import { firestore } from 'nativescript-plugin-firebase';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private firebase : FirebaseService) { }


  getCurrentPromotionOfShop(id : string) : Promise<firestore.DocumentSnapshot> {
    return this.firebase.getCurrentPromotionOfShop(id).get();
  }

  getPromotionsOfShop(id : string) : Promise<firestore.QuerySnapshot> {
    return this.firebase.getPromotionsOfShop(id).get();
  }

}
