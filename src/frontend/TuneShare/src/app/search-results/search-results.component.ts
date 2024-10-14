import {Component, Input, OnInit} from '@angular/core';
import {UserListedComponent} from "../user-listed/user-listed.component";
import {NgForOf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ListOfUsersComponent} from "../list-of-users/list-of-users.component";
import {TuneShareService} from "../tune-share.service";

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

// displays results of a search (/search)
export class SearchResultsComponent implements OnInit {

  input:string = "";
  filteredUserList: any[] = [];

  constructor(private route: ActivatedRoute, private tuneshareService: TuneShareService) { }

  filterResults(text: string) {
    this.tuneshareService.searchUser(text).subscribe({
      next: users => {
        this.filteredUserList = users;
      }
    })
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
