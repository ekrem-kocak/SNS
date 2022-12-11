import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from './models/AuthResponse';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_key = environment.firebaseConfig.apiKey;

  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.api_key, {
      email,
      password,
      returnSecureToken: true
    })
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.api_key, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
      })
    )
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('user')!)

    if (!user)
      return;

    const loadedUser = new User(
      user.email,
      user.password,
      user.token,
      new Date(user._tokenExpirationDate)
    );

    this.user.next(loadedUser)
  }

  logout() {
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigate(["/auth"]);
  }

  resetPassword(email: string) {
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + this.api_key, {
      email,
      requestType: 'PASSWORD_RESET'
    })
  }

  handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    let expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));

    const user = new User(
      email,
      userId,
      token,
      expirationDate
    )
    this.user.next(user);

    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(["/"])
  }
}
