import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsComponent } from './friends.component';
import { SearchComponent } from './search/search.component';
import { FriendRequestComponent } from '../template/friend-request/friend-request.component';
import { UserComponent } from './user/user.component';
import { RequestsComponent } from './requests/requests.component';
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
  declarations: [
    FriendsComponent,
    SearchComponent,
    FriendRequestComponent,
    UserComponent,
    RequestsComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PipeModule
  ],
  entryComponents: [ ]
})
export class FriendsModule { }
