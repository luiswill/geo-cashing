import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { registerElement } from "nativescript-angular/element-registry";
import { MapboxViewApi, Viewport as MapboxViewport, MapboxMarker } from "nativescript-mapbox";
//import { AddressOptions, Directions } from "nativescript-directions";
import { accessToken } from '../../shared/mapbox';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ShopInfosComponent } from '../../shared/shared/shop-infos/shop-infos.component';
import { ShopsService } from '~/app/services/shops.service';
import { firestore } from 'nativescript-plugin-firebase';
import { MapView } from 'nativescript-google-maps-sdk';
import { Shop, convertToShop } from '~/app/shared/shop';

registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
  selector: 'ns-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [ModalDialogService],
  moduleId: module.id,
  animations: [
    trigger("flyInOut", [
      state("in", style({ opacity: 1 })),
      transition("void => *", [
        style({ opacity: 0 }),
        animate("1000ms 500ms ease-out")
      ])
    ]),
    trigger("from-left", [
      state("in", style({
        "opacity": 0.8,
        transform: "translate(0)"
      })),
      state("void", style({
        "opacity": 0,
        transform: "translate(-20%)"
      })),
      transition("void => *", [animate("700ms 1800ms ease-out")])
    ]),
    trigger("from-right", [
      state("in", style({
        "opacity": 1,
        transform: "translate(0)"
      })),
      state("void", style({
        "opacity": 0,
        transform: "translate(20%)"
      })),
      transition("void => *", [animate("700ms 2700ms ease-out")])
    ])
  ]
})
export class MapComponent implements OnInit {
  private accessToken: string;

  //private directions: Directions;
  private map: MapboxViewApi;

  private mapMarkers : MapboxMarker[] = [];
  private shops: Shop[] = [];



  constructor(private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,
    public shopService: ShopsService) {
    //this.directions = new Directions();
  }

  ngOnInit(): void {

    this.accessToken = accessToken;


    /*  this.showDirectionsTo([
       {
         lat: 43.421834,
         lng: 24.086096,
       },
       {
         lat: 52.1851585,
         lng: 5.3974241
       }
     ]); */
  }

  onMapReady(args): void {
    this.map = args.map;

    this.loadMarkers();
  }


  loadMarkers(): void {
    this.shopService.getShops().then((querySnapshot: firestore.QuerySnapshot) => {
      querySnapshot.forEach((doc: firestore.DocumentSnapshot) => {

        if (doc.exists) {
          let shop: Shop = convertToShop(doc.data());
          this.shops.push(shop);
        }
      });

      this.convertShopsToMarkers(this.shops);
      this.map.addMarkers(this.mapMarkers);
    });

  }


  convertShopsToMarkers(shops : Shop[]) : void {
    shops.forEach((shop : Shop) => {
      this.mapMarkers.push(this.convertToMarker(shop));
    });

  }

  convertToMarker(shop: Shop) : MapboxMarker {
    console.log("shop.promotions.length >= 1", shop.promotions.length >= 1);
    let marker : MapboxMarker = {
      lat: shop.mapPosition.latitude,
      lng: shop.mapPosition.longitude,
      iconPath: shop.promotions.length >= 1 ? "iconmapmarkerpromotions.png" : "res/@drawable/iconmapmarker.png",
      onCalloutTap: () => {this.showRestaurant() },
      title: shop.name,
      subtitle: shop.category
    };

    console.log("SHOP MARKER ", marker);

    return marker;
  }

  showPromotions() {
    this.map.removeMarkers().then(() => {
      //this.map.addMarkers(makers);
    })
  }

  showRestaurant() {
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: true,
      context: {},
    };

    this.modalService.showModal(ShopInfosComponent, options);
  }

  private showDirectionsTo(): void {

    // addresses: Array<AddressOptions>
/*     this.directions.navigate({
      to: addresses,
      ios: {
        // Apple Maps can't show waypoints, so open Google maps if available in that case
        preferGoogleMaps: addresses.length > 1,
        allowGoogleMapsWeb: true
      }
    })
      .then(() => console.log("Showed directions successful."))
      .catch(error => console.log(error)); */
  }

}
