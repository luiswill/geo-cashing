import { Component, OnInit, Input } from '@angular/core';
import { AppUser } from '~/app/shared/appUser';

@Component({
  selector: 'ns-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit {

  @Input() user : AppUser;

  constructor() { }

  ngOnInit(): void {
  }

}
