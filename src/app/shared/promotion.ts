import { firestore } from "nativescript-plugin-firebase";

export interface Promotion {
    shopId: number,
    text: string,
}



export var convertToPromotion = (doc : firestore.DocumentData) => {


    if(!doc.shopId || !doc.text ) {
        throw new Error('Document id/name not available.');
    }

    let promotion : Promotion = {
        shopId : doc.shopId,
        text: doc.text
    }

    return promotion;
}