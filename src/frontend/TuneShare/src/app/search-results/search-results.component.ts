import {Component} from '@angular/core';
import {UserListedComponent} from "../user-listed/user-listed.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    UserListedComponent,
    NgForOf
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  findings: any[] = [
    {
      username: "max", displayname: "maxxx"
    },
    {
      username: "min", displayname: "minxx"
    }
  ];
}
