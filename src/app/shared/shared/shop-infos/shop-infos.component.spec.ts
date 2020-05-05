import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInfosComponent } from './shop-infos.component';

describe('ShopInfosComponent', () => {
  let component: ShopInfosComponent;
  let fixture: ComponentFixture<ShopInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
