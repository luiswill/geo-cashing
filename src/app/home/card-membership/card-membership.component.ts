import { Component, OnInit } from '@angular/core';
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'ns-membership-card',
  templateUrl: './card-membership.component.html',
  styleUrls: ['./card-membership.component.scss']
})
export class CardMembershipComponent implements OnInit {

  frontAppleCard: GridLayout;
  backAppleCard: GridLayout;
  appleCardParentView: GridLayout;
  frontCardInteraction: boolean = false;
  constructor(private _page: Page) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.frontAppleCard = this._page.getViewById('frontAppleCard');
    this.backAppleCard = this._page.getViewById('backAppleCard');
    this.appleCardParentView = this._page.getViewById('appleCardParentView');
    this.onRotateCard('v');
  }

  onThemeSelectorTap(theme: string): void {
    this.appleCardParentView.className = theme;
  }

  animateAppleCard(view: GridLayout, classes: string): void {
    view.className = classes;
  }

  onRotateCard(rotate: string) {
    if (!this.frontCardInteraction) {
      this.animateAppleCard(this.frontAppleCard, this.getRotationStyle('front', 'back', rotate));
      this.animateAppleCard(this.backAppleCard, this.getRotationStyle('back', 'front', rotate));
      this.frontCardInteraction = true;
    } else {
      this.animateAppleCard(this.frontAppleCard, this.getRotationStyle('front', 'front', rotate));
      this.animateAppleCard(this.backAppleCard, this.getRotationStyle('back', 'back', rotate));
      this.frontCardInteraction = false;
    }
  }

  getRotationStyle(from: string, to: string, rotate: string) {
    return `apple-card apple-card-${from} flip-${rotate}-${to}`;
  }

}
