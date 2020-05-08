import { firestore } from "nativescript-plugin-firebase";

export interface Promotion {
    shopId: number,
    text: string,
    peopleLikedCount: number
}



export var getCurrentPromotionId = () => {
    var d = new Date();
    var currentMonth = d.getMonth().toString();
    var currentYear = d.getFullYear().toString();

    return currentMonth + currentYear;
  }


export var convertToPromotion = (doc : firestore.DocumentData) => {


    if(!doc.shopId || !doc.text) {
        throw new Error('Document id/name not available.');
    }

    let promotion : Promotion = {
        shopId : doc.shopId,
        text: doc.text,
        peopleLikedCount: doc.peopleLikedCount
    }

    return promotion;
}