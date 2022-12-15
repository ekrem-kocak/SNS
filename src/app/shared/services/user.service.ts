import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/User';
import { UserDto } from 'src/app/auth/models/UserDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(environment.firebaseConfig.databaseURL + '/users/' + id);
  }

  newUser(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(environment.firebaseConfig.databaseURL + '/users.json', user);
  }

  updateUser(userId: string, updatedUser: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(environment.firebaseConfig.databaseURL + '/users/' + userId, updatedUser);
  }
}
