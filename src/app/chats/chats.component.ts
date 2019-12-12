import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { expand, concatMap } from 'rxjs/operators';

import { FriendsService } from '../shared/friends.service';
import { FriendsChatPreview } from '../model/friends';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  friends: Observable<FriendsChatPreview[]>
  requestTime = 1000;

  constructor(
    private friendServ: FriendsService
  ) { }

  ngOnInit() {
    this.friends = this.friendServ.friendsChatPreview().pipe(
      expand((_) => timer(this.requestTime).pipe(
        concatMap((_) => this.friendServ.friendsChatPreview())
      ))
    )
  }

}
