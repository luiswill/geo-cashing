import { Component, OnInit } from '@angular/core';
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { Page } from 'tns-core-modules/ui/page/page';
import { FirebaseService } from '~/app/services/firebase.service';
import { AppUser } from '~/app/shared/appUser';

@Component({
  selector: 'ns-membership-card',
  templateUrl: './card-membership.component.html',
  styleUrls: ['./card-membership.component.scss']
})
export class CardMembershipComponent implements OnInit {
  appUser : AppUser;


  constructor(
    private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.user.subscribe((appUser) => {
      this.appUser = appUser;
    });

  }


}
