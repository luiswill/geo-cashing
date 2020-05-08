import { firestore } from "nativescript-plugin-firebase";
import { Promotion } from "./promotion";

export interface Shop {
    id: number,
    name: string,
    cover?: string,
    images?: Array<string>,
    category?: string,
    categoryTag?: string,
    likes?: number,
    isLike?: boolean,
    isFavorite?: boolean,
    comments?: number,
    rating?: string,
    description?: string,
    mapPosition?: firestore.GeoPoint,
    promotions?: Promotion[]
}


export var convertToShop = (doc : firestore.DocumentData) => {

    if(!doc.id || !doc.name ) {
        throw new Error('Shop converting : Document id/name not available.');
    }

    let shop : Shop = {
        id : doc.id,
        name : doc.name,
        cover : doc.cover,
        images : doc.images,
        rating : doc.rating,
        isFavorite : doc.isFavorite,
        category : doc.category,
        likes : doc.likes,
        comments : doc.comments,
        isLike : doc.isLike,
        description: doc.description,
        mapPosition: doc.mapPosition
    }


    return shop;
}