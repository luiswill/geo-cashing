import { Injectable } from '@angular/core';
import { firestore, query } from 'nativescript-plugin-firebase';
import { FirebaseService } from './firebase.service';
import { PromotionsService } from './promotions.service';
import { convertToPromotion, Promotion } from '../shared/promotion';
import { Shop, convertToShop } from '../shared/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(private firebase: FirebaseService,
    private promotionsService: PromotionsService) { }


  getShops(): Promise<Shop[]> {
    return new Promise((resolve, reject) => {
      this.firebase.getShops().get().then((querySnapshot: firestore.QuerySnapshot) => {

        var docsLength: number = querySnapshot.docs.length;
        var docsCounterLoaded: number = 0;

        let shops: Shop[] = [];

        querySnapshot.forEach((shopDoc: firestore.DocumentSnapshot) => {
          let shop: Shop = convertToShop(shopDoc.data());

          this.promotionsService.getPromotionsOfShop(shop.id).then((promotions: Promotion[]) => {
            shop.promotions = promotions;
            shops.push(shop);
            docsCounterLoaded++;


            if (docsLength == docsCounterLoaded) {
              resolve(shops);
            }

          });
        });
      });
    });
  }

  getShop(shopId: string): Promise<Shop> {
    return new Promise((resolve, reject) => {

      let shop: Shop;
      this.firebase.getShop(shopId).get().then((docShop: firestore.DocumentSnapshot) => {

        shop = convertToShop(docShop.data());

        this.promotionsService.getPromotionsOfShop(shopId).then((promotions: Promotion[]) => {
          shop.promotions = promotions;

          resolve(shop)
        });

      });
    });
  }


}
