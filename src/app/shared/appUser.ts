import { firestore, User, Provider } from "nativescript-plugin-firebase";

export interface AppUser {
    uid: string,
    displayName: string,
    email: string,
    providers?: Provider[],
    photoUrl?: string,
    subscription: Subscription.FREE
}


export enum Subscription {
    FREE,
    LOW_COST,
    HIGH_COST
}

export var convertToUser = (user: User) => {

    if(!user.uid || !user.displayName ) {
        throw new Error('User converting : problem.');
    }

    let appUser : AppUser = {
        uid : user.uid,
        displayName : user.displayName,
        email: user.displayName,
        providers: user.providers,
        photoUrl: user.photoURL,
        subscription: Subscription.FREE
    }


    return appUser;
}