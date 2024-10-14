import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {User} from "../types";
import {TuneShareService} from "../tune-share.service";

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
  displayname: string | undefined;
  username: string |undefined ;
  followed: boolean = false;

  constructor(private tuneShareService: TuneShareService) {}

  ngOnInit() {
    this.tuneShareService.getFollowedUsers().subscribe({
      next: users => {
        this.followed = users.find(foundUser => foundUser.id == this.user?.id) != undefined;
        this.username = this.user?.username ? this.user?.username : "[unknown username]";
        this.displayname = this.user?.display_name ? this.user?.display_name : "[unknown displayname]";
      }
    });
  }

  follow() {
    if(this.user?.id){
      if (!this.followed) {
        this.tuneShareService.followUser(this.user.id).subscribe();
        this.followed = true;
      }else{
        this.tuneShareService.unfollowUser(this.user.id).subscribe();
        this.followed = false;
      }
    }
  }
}
