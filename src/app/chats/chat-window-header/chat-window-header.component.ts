import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { concatMap, expand } from 'rxjs/operators';
import { SuiModalService } from 'ng2-semantic-ui';

import { ConfirmModal } from '../../template/confirm-modal/confirm-modal.component';
import { FriendsService } from '../../shared/friends.service';
import { Friend } from '../../model/friends';

// Jqeury Var
declare var $ : any;

@Component({
  selector: 'app-chat-window-header',
  templateUrl: './chat-window-header.component.html',
  styleUrls: ['./chat-window-header.component.css']
})
export class ChatWindowHeaderComponent implements OnInit, OnDestroy {

  lastSeenSubscription:Subscription;
  friendsDetailSubscription:Subscription;
  friendLastSeen:number;
  friendsDetails:Friend;
  requestTime = 2500;
  friend:string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private elemRef: ElementRef,
    private suiModalServ: SuiModalService,
    private friendServ: FriendsService
  ) {
    this.friend = activatedRoute.snapshot.params.username;
  }
  ngOnInit() {
    this.getFriendsDetails();
    this.getLastSeen();
  }

  getFriendsDetails() {
    this.friendsDetailSubscription = this.friendServ.friendsDetails(this.friend).subscribe(
      (response) => this.friendsDetails = response,
      (error) => this.getFriendsDetails()
    )
  }

  getLastSeen() {
    this.lastSeenSubscription = this.friendServ.friendLastSeen(this.friend).pipe(
      expand((_) => timer(this.requestTime).pipe(
        concatMap((_) => this.friendServ.friendLastSeen(this.friend))
      ))
    ).subscribe(
      (response) => this.friendLastSeen = response.last_seen,
      (error) => this.getLastSeen()
    )
  }

  menu() {
    $($(this.elemRef.nativeElement).find('.action_menu')).toggle();
  }

  unfriendConfirmation() {
    this.suiModalServ
      .open(new ConfirmModal('Unfriend ' + this.friend, 'Are you sure you want to unfriend ' + this.friend.toUpperCase() + '.'))
      .onApprove(() => {})
      .onDeny(() => {});
  }

  unfriend() {

  }

  ngOnDestroy() {
    if(this.friendsDetailSubscription) this.friendsDetailSubscription.unsubscribe();
    if(this.lastSeenSubscription) this.lastSeenSubscription.unsubscribe();
  }

}