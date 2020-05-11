import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { registerElement } from "nativescript-angular/element-registry";
//import { AddressOptions, Directions } from "nativescript-directions";
import { accessToken } from '../../shared/mapbox';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ShopInfosComponent } from '../../shared/shared/shop-infos/shop-infos.component';
import { ShopsService } from '~/app/services/shops.service';
import { firestore } from 'nativescript-plugin-firebase';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { Shop, convertToShop } from '~/app/shared/shop';

import { ImageSource, fromFile, fromResource, fromBase64 } from "tns-core-modules/image-source";
import * as BitmapFactory from "nativescript-bitmap-factory";
import * as imageAssetModule from "tns-core-modules/image-asset/image-asset";

import { View, getViewById, ViewBase, Color } from 'tns-core-modules/ui/page/page';
import { screen } from "tns-core-modules/platform";
import { Image } from 'tns-core-modules/ui/image/image';

registerElement("MapView", () => MapView);

registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
);
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
export class MapComponent {

  latitude = 46.6;
  longitude = 9.20;
  zoom = 8;
  minZoom = 0;
  maxZoom = 22;
  bearing = 0;
  tilt = 0;
  padding = [40, 40, 40, 40];
  mapView: MapView;

  private mapMarkers: Marker[] = [];
  private shops: Shop[] = [];

  currentShopSelectedInfos: Shop = {
    id: 0,
    name: "Shop",
    promotions: [
      {
        peopleLikedCount: 30,
        shopId: 0,
        text: "promotion"
      }
    ]
  };

  isInfoWindowVisible : boolean = false;
  shopsCounter: number = 0;

  lastCamera: String;


  constructor(private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,
    public shopService: ShopsService) {
    //this.directions = new Directions();

  }

  ngAfterViewInit(): void {
  }


  fabTap(): void {

  }

  //Map events
  onMapReady(event) {
    this.mapView = event.object;

    this.loadMarkers();

  }


  onMarkerEvent(args) {
    this.showInfoWindowOfShop(args.marker.userData.id);
  }


  private showInfoWindowOfShop(shopId: string): void {
    this.shopService.getShop(shopId).then((shop: Shop) => {
      this.isInfoWindowVisible = true;
      this.currentShopSelectedInfos = shop;
    })
  }

  private loadMarkers(): void {
    this.shopService.getShops().then((querySnapshot: firestore.QuerySnapshot) => {

      querySnapshot.forEach((doc: firestore.DocumentSnapshot) => {

        if (doc.exists) {
          let shop: Shop = convertToShop(doc.data());
          this.shops.push(shop);
        }
      });

      this.convertShopsToMarkers(this.shops);

      this.mapMarkers.forEach((marker: Marker) => {
        this.mapView.addMarker(marker);
      })
    });

  }

  convertShopsToMarkers(shops: Shop[]): void {
    shops.forEach((shop: Shop) => {
      this.mapMarkers.push(this.convertToMarker(shop));
    });

  }

  getNumber(): number {
    return 3 + 3;
  }

  convertToMarker(shop: Shop): Marker {
    //iconPath: shop.promotions.length >= 1 ? "iconmapmarkerpromotions.png" : "res/@drawable/iconmapmarker.png",

    const posMap: Position = Position.positionFromLatLng(shop.mapPosition.latitude, shop.mapPosition.longitude);

    var marker: Marker = new Marker();


    marker.position = posMap;
    marker.title = shop.name;
    marker.snippet = "test";
    marker.userData = { id: "albacio", placementInArray: this.shopsCounter };

    this.shopsCounter++;

    marker.icon = this.getMapMarkerImage(shop.likes);

    return marker;
  }


  getMapMarkerImage(shopLikes : number): Image {
    const imageSource = fromResource("icon");

    let icon: Image = new Image();

    let mutable = BitmapFactory.makeMutable(imageSource);
    BitmapFactory.asBitmap(mutable).dispose((imageBitmap) => {
      /* Set the source of the bitmap */

      imageBitmap.drawCircle(80, '200,100',
        new Color("#ff4400"), new Color("#ff4400"));

      imageBitmap.writeText(shopLikes, '145, 135', {
        color: new Color("#FFFFFF"),
        size: 35
        // name: 'Roboto'
      });

      /* resize with aspect ratio */
      let newImageBitmap = imageBitmap.resizeMax(150);



      let newImageSrc = newImageBitmap.toImageSource();

      /* Bind the new resized image to the icon */
      icon.imageSource = newImageSrc;
    });


    return icon;
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
