import { Injectable } from '@angular/core';
import { firestore } from 'nativescript-plugin-firebase';
import { FirebaseService } from './firebase.service';
import { Promotion, convertToPromotion } from '../shared/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private firebase: FirebaseService) { }


  getCurrentPromotionOfShop(id: string): Promise<firestore.DocumentSnapshot> {
    return this.firebase.getCurrentPromotionOfShop(id).get();
  }

  getPromotionsOfShop(id: string): Promise<Promotion[]> {
    return new Promise((resolve, reject) => {
      this.firebase.getPromotionsOfShop(id).get().then((querySnapshot: firestore.QuerySnapshot) => {

        let promos: Promotion[] = [];

        querySnapshot.forEach((promotionDoc: firestore.DocumentSnapshot) => {
          let promo: Promotion = convertToPromotion(promotionDoc.data());
          promos.push(promo);
        });

        resolve(promos);
      });
    });

  }

}
