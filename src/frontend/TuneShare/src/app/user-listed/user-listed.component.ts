import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-listed',
  standalone: true,
  imports: [],
  templateUrl: './user-listed.component.html',
  styleUrl: './user-listed.component.scss'
})
export class UserListedComponent {
  @Input() username : string | undefined;
  @Input() displayname : string | undefined;
}
