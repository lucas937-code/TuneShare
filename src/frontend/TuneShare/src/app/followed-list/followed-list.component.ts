import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {UserListedComponent} from "../user-listed/user-listed.component";
import {ListOfUsersComponent} from "../list-of-users/list-of-users.component";

@Component({
  selector: 'app-followed-list',
  standalone: true,
  imports: [
    NgForOf,
    UserListedComponent,
    ListOfUsersComponent
  ],
  templateUrl: './followed-list.component.html',
  styleUrl: './followed-list.component.scss'
})
export class FollowedListComponent {

  follower:any[] = [
    {
      displayname: "Neuer",
      username: "vielleichtNicht"
    },
    {
      displayname: "Max",
      username: "Maxxx",
    }
  ]
}
