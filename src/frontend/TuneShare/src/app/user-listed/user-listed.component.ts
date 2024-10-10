import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

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
  @Input() username : string | undefined;
  @Input() displayname : string | undefined;

  followed: boolean = false;

  follow() {
    this.followed = !this.followed;
  }
}
