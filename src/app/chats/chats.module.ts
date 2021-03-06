import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuiModule } from 'ng2-semantic-ui';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsComponent } from './chats.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { FriendsWindowComponent } from './friends-window/friends-window.component';
import { ChatWindowHeaderComponent } from './chat-window-header/chat-window-header.component';
import { PipeModule } from '../pipe/pipe.module';
import { UserTextComponent } from '../template/user-text/user-text.component';
import { FriendTextComponent } from '../template/friend-text/friend-text.component';
import { ChatWindowInputComponent } from './chat-window-input/chat-window-input.component';

@NgModule({
  declarations: [
    ChatsComponent,
    ChatWindowComponent,
    FriendsWindowComponent,
    ChatWindowHeaderComponent,
    UserTextComponent,
    FriendTextComponent,
    ChatWindowInputComponent
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule,
    SuiModule
  ]
})
export class ChatsModule { }
