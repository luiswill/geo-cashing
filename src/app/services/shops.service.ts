import { Injectable } from '@angular/core';
import { firestore } from 'nativescript-plugin-firebase';
import { FirebaseService } from './firebase.service';
import { PromotionsService } from './promotions.service';
import { convertToPromotion, Promotion } from '../shared/promotion';
import { Shop, convertToShop } from '../shared/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(private firebase : FirebaseService,
    private promotionsService: PromotionsService) { }


  getShops() : Promise<firestore.QuerySnapshot> {
    return this.firebase.getShops().get();
  }

  getShop(shopId : string) : Promise<Shop> {
    return new Promise((resolve, reject) => {

      let shop: Shop;
      this.firebase.getShop(shopId).get().then( (docShop : firestore.DocumentSnapshot) => {

        shop = convertToShop(docShop.data());

        this.promotionsService.getPromotionsOfShop(shopId).then((querySnapshot: firestore.QuerySnapshot) => {
          let promotions: Promotion[] = []

          querySnapshot.forEach((doc: firestore.DocumentSnapshot) => {
            if (doc.exists) {
              let promotion: Promotion = convertToPromotion(doc.data());
              promotions.push(promotion);
            }
          });

          shop.promotions = promotions;

          resolve(shop)
        });

      });
    });
  }


}
