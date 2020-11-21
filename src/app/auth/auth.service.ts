import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url = 'http://localhost:3000/users';

    constructor(private http: HttpClient) {

    }

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(this.url);
    }

    login(email: string, password: string): Observable<User>{
        return this.getUsers().pipe(
            map(
                (stream: User[]) => stream.find(user => user.email === email && user.password === password)
            )
        );
    }
}
