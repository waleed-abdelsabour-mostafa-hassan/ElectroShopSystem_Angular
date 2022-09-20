import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Users } from 'src/@electronic/model/user';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { iSellers } from 'src/interface/iSellers';
import { UserLogin } from 'src/interface/IUserLogin';
import { UserRegisteration } from 'src/interface/IUserRegisteration';
// import { IProductImg } from 'src/interface/IProductImg';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private crypt: CryptService) {}

  _url = '';
  _url2 = '';

  loggedIn: boolean = true;
  baseURL = 'https://localhost:7096/api/Account/';
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getUserImgs(UserID: string): Observable<string> {
    this._url = 'https://localhost:7096/api/User/GetUserImgByUerId/' + UserID;
    return this.http.get(this._url, { responseType: 'text' }).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'internal Error');
      })
    );
  }
  getAllSellers(): Observable<iSellers[]> {
    return this.http
      .get<iSellers[]>('https://localhost:7096/api/User/GetAllSeller')
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'internal Error');
        })
      );
  }


  GetUser(UserID: string): Observable<Users> {
    this._url2 = 'https://localhost:7096/api/User/GetUser/' + UserID;
    return this.http.get<Users>(this._url2).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'internal Error');
      })
    );
  }




  getUserName(UserID: string): Observable<string> {
    this._url2 = 'https://localhost:7096/api/User/GetUserNameByUerId/' + UserID;
    return this.http.get(this._url2, { responseType: 'text' }).pipe(
      catchError((err) => {
        return throwError(() => err.message || 'internal Error');
      })
    );
  }

  Register(reg: UserRegisteration) {
    return this.http
      .post(this.baseURL + 'register', reg, { responseType: 'text' })
      .pipe();
  }
  Login(log: UserLogin): Observable<UserLogin> {
    return this.http
      .post<UserLogin>(this.baseURL + 'login', log, this.headers)
      .pipe();
  }
  Logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
  }

  UploadIMGUser(fd: FormData): Observable<string> {
    return this.http
      .put('https://localhost:7096/api/Account/UploadIMGUser', fd, {
        responseType: 'text',
      })
      .pipe(
        catchError((err) => {
          return throwError(() => err.message || 'Internal Server Error');
        })
      );
  }

  public _navItemSource = new BehaviorSubject<boolean>(false);

  navItem$ = this._navItemSource.asObservable();

  changeNav(bool: boolean) {
    this._navItemSource.next(bool);
  }

  public _navItemSourceimg = new BehaviorSubject<string>('');

  navItemimg$ = this._navItemSourceimg.asObservable();

  changeimg(img: string) {
    this._navItemSourceimg.next(img);
  }
}
