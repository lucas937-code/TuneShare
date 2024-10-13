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
export class UserListedComponent {
  @Input() user: User | undefined;
  followed: boolean = false;


  follow() {
    this.followed = !this.followed;
  }
}
