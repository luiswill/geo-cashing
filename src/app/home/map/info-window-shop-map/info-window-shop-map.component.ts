import { Component, OnInit, Input } from '@angular/core';
import { Shop } from '~/app/shared/shop';
import { getCurrentPromotionId, Promotion } from '~/app/shared/promotion';

@Component({
  selector: 'ns-info-window-shop-map',
  templateUrl: './info-window-shop-map.component.html',
  styleUrls: ['./info-window-shop-map.component.scss']
})
export class InfoWindowShopMapComponent implements OnInit {


  @Input() shop : Shop;
  currentPromotionId : string;

  constructor() { 

  }

  ngOnInit(): void {
    this.currentPromotionId = getCurrentPromotionId();
    console.log("Current shop", this.shop);

  }

  ngOnChanges(): void {
    console.log("CHANGES");
    console.log("SHOP PROMOTIONS ", this.shop.promotions[0]);
  }

}
