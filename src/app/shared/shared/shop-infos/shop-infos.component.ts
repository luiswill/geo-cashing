import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgZone } from '@angular/core';
import { Shop } from "../../shop";
import { RouterExtensions } from "nativescript-angular/router";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";

declare var android : any;

@Component({
  selector: 'ns-shop-infos',
  templateUrl: './shop-infos.component.html',
  styleUrls: ['./shop-infos.component.css'],
  moduleId: module.id
})
export class ShopInfosComponent {

  shop: Shop;

  constructor(public modalParams: ModalDialogParams, 
    public zone: NgZone, 
    private routerExtensions: RouterExtensions,
    private page: Page) {

    console.log("CONSTRUCTOR shop infos");
    console.log("SHOP NAME ")




    setTimeout(() => {
      let shop: Shop = {
        id: 1,
        name: "Manila Ultimate Tombstone Burger",
        cover: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        images: [
          "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        ],
        category: "Burger",
        categoryTag: "#2D9CDB",
        likes: 987,
        isLike: false,
        isFavorite: true,
        comments: 13,
        rating: "4.5",
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione maiores, veritatis nesciunt sint dolorum sequi dicta omnis dolor blanditiis, ipsam officiis commodi temporibus quas non nobis tempore saepe necessitatibus quasi! Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
				\nRatione maiores, veritatis nesciunt sint dolorum sequi dicta omnis dolor blanditiis, ipsam officiis commodi temporibus quas non nobis tempore saepe necessitatibus quasi! Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
				\nNesciunt sint dolorum sequi dicta omnis dolor blanditiis, ipsam officiis commodi temporibus quas non nobis tempore saepe necessitatibus quasi!
				\nRatione maiores, veritatis nesciunt sint dolorum sequi dicta omnis dolor blanditiis, ipsam officiis commodi temporibus quas non nobis tempore saepe necessitatibus quasi! Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
				\nNesciunt sint dolorum sequi dicta omnis dolor blanditiis, ipsam officiis commodi temporibus quas non nobis tempore saepe necessitatibus quasi!`
      }
      this.zone.run(() => this.shop = shop);
    }, 500);
  }

  goBack() {
    close()
  }


  categoryIcon() {
    switch (this.shop.categoryTag) {
      case "Burger":
        return String.fromCharCode(0xf0f5); //"fa-cutlery";
        break;
      case "Beer":
        return String.fromCharCode(0xf0fc); //"fa-beer";
        break;
      case "Pancake":
        return String.fromCharCode(0xf0f4); //"fa-coffee";
        break;
      case "Cake":
        return String.fromCharCode(0xf1fd); //"fa-birthday-cake";
        break;
      default:
        return String.fromCharCode(0xf06d); //"fa-fire";
        break;
    }
  }


    getDirections() : void {
      //
    }


    toggleLike() : void {

    }
}
