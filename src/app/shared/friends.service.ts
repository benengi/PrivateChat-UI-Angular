import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { SearchFriends, FriendsChatPreview } from '../model/friends';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient) { }

  /**
   * Search from a user account in api
   * 
   * @param search Search term
   * @return An `Observable` of type `SearchFriends`
   */
  search(search:string) : Observable<SearchFriends> {
    return this.http.get<SearchFriends>('api/friends/search/'+search).pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    );
  }

  /**
   * Get user friends chats preview from api
   * 
   * @return An `Observable` array of type `Friend`
   */
  friendsChatPreview() : Observable<FriendsChatPreview[]> {
    return this.http.get<FriendsChatPreview[]>('api/friends').pipe(
      retry(2),
      catchError((error:HttpErrorResponse) => throwError(error.message))
    )
  }

}
