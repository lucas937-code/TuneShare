import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {UserListedComponent} from "../user-listed/user-listed.component";
import {ListOfUsersComponent} from "../list-of-users/list-of-users.component";
import {User} from "../types";
import {TuneShareService} from "../tune-share.service";

@Component({
  selector: 'app-followed-list',
  standalone: true,
  imports: [
    NgForOf,
    UserListedComponent,
    ListOfUsersComponent,
    NgIf
  ],
  templateUrl: './followed-list.component.html',
  styleUrl: './followed-list.component.scss'
})
export class FollowedListComponent implements OnInit {

  follower:User[] | undefined;

  constructor(private tuneShareService: TuneShareService) {}

  ngOnInit() {
    this.tuneShareService.getFollowedUsers().subscribe({
      next: users => {
        this.follower = users;
      }
    })
  }
}
