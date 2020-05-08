import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoWindowShopMapComponent } from './info-window-shop-map.component';

describe('InfoWindowShopMapComponent', () => {
  let component: InfoWindowShopMapComponent;
  let fixture: ComponentFixture<InfoWindowShopMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoWindowShopMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoWindowShopMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
