import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${this.url}/users?page=2&delay=3`).pipe(
      //tap(res => console.log),
      map((u:any) => u['data'])
    );
  }

  getUserById(id: string) {
    return this.http.get<User>(`${this.url}/users/${id}`).pipe(
      //tap(res => console.log),
      map((resp:any) => resp['data'])
    );
  }

}

