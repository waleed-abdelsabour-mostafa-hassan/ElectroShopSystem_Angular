import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IComment } from 'src/interface/IComment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}
  _url = '';
  _url1 = '';
  // https://localhost:7096/NewComment/
  getAllCommentByProdID(prodID: number) {
    this._url = `https://localhost:7096/GetAllCommentsProduct/` + prodID;
    return this.http.get<IComment[]>(this._url).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'internal Error');
      })
    );
  }
  AddNewComment(userid:string ,prodID: number,commentString:string) {
    this._url = `https://localhost:7096/NewComment/${userid}/${prodID}/${commentString}`;
    return this.http.get<void>(this._url).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'internal Error');
      })
    );
  }
}
