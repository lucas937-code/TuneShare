import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {UserListedComponent} from "../user-listed/user-listed.component";
import {User} from "../types";

@Component({
  selector: 'app-list-of-users',
  standalone: true,
    imports: [
        NgForOf,
        UserListedComponent
    ],
  templateUrl: './list-of-users.component.html',
  styleUrl: './list-of-users.component.scss'
})
export class ListOfUsersComponent {

  @Input() userList: User[] = [];
}
