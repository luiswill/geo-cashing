import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMembershipComponent } from './card-membership.component';

describe('CardMembershipComponent', () => {
  let component: CardMembershipComponent;
  let fixture: ComponentFixture<CardMembershipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardMembershipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
