import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { ShopInfosComponent } from '../shared/shared/shop-infos/shop-infos.component';
import { CardMembershipComponent } from './card-membership/card-membership.component';



@NgModule({
  declarations: [
    QrcodeComponent, 
    HomeComponent, 
    MapComponent,
    ShopInfosComponent,
    CardMembershipComponent
    ],
  imports: [
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents : [ShopInfosComponent]
})
export class HomeModule { }
