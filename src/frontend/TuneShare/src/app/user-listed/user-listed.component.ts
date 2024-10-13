import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {User} from "../types";

@Component({
  selector: 'app-user-listed',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './user-listed.component.html',
  styleUrl: './user-listed.component.scss'
})
export class UserListedComponent implements OnInit {
  @Input() user: User | undefined;
  displayname: string = "[unknown displayname]";
  username: string = "[unknown username]";
  followed: boolean = false;

  ngOnInit() {
    this.username = this.user?.username ? this.user?.username : this.username;
    this.displayname = this.user?.display_name ? this.user?.display_name : this.displayname;
  }

  follow() {
    this.followed = !this.followed;
  }
}
