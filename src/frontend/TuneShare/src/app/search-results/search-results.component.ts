import {Component, Input, OnInit} from '@angular/core';
import {UserListedComponent} from "../user-listed/user-listed.component";
import {NgForOf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ListOfUsersComponent} from "../list-of-users/list-of-users.component";

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    UserListedComponent,
    NgForOf,
    ListOfUsersComponent
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit {

  input:string = "";
  filteredUserList: any[] = [];
  userList: any[] = [];

  constructor(private route: ActivatedRoute) {
    this.userList = [
      {
        username: "max", display_name: "maxxx", id: 1
      },
      {
        username: "min", display_name: "minxx", id: 2
      }
    ]
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredUserList = this.userList;
      return;
    }

    this.filteredUserList = this.userList.filter(
      user => ('@'+(user?.username.toLowerCase())).includes(text.toLowerCase()) || user?.displayname.toLowerCase().includes(text.toLowerCase()),
    );
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
          this.input = params['input'];
          this.filterResults(this.input)
        }
      );
    }

}
