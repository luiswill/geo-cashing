import { firestore } from 'nativescript-plugin-firebase';

export interface Dish {
    id: number,
    name: string,
    price: number,
    image?: string,
    isFavorite?: boolean,
    category?: string,
    likes?: number,
    comments?: string[],
    rating?: number,
    featured?: boolean,
    description?: string
}

export var convertToDish = (doc : firestore.DocumentData) => {
    if(!doc.id || !doc.price || !doc.name) {
        throw new Error('Document price/id/name not available.');
    }

    let dish: Dish = {

        id : doc.id,
        name : doc.name,
        price : doc.price,
        rating : doc.rating,
        isFavorite : doc.isFavorite,
        category : doc.category,
        likes : doc.likes,
        comments : doc.comments,
        featured : doc.featured,
        description : doc.description,
        image : doc.image,
    };
    
    return dish;
}