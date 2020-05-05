import { Injectable } from '@angular/core';
import { firestore } from 'nativescript-plugin-firebase';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(private firebase : FirebaseService) { }


  getShops() : Promise<firestore.QuerySnapshot> {
    return this.firebase.getShops().get();
  }
}
