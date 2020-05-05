import { NgModule, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ShopInfosComponent } from './shop-infos/shop-infos.component';
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { NativeScriptRouterModule } from 'nativescript-angular/router';


@NgModule({
  declarations: [ShopInfosComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [
    ShopInfosComponent
  ]
  
})
export class SharedModule { }