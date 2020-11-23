import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url = 'http://localhost:3000/users';

    private isLogged$ = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {

    }

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(this.url);
    }

    getUserById(id: number): Observable<User>{
        const url = `${this.url}/${id}`;

        return this.http.get<User>(url);
    }

    login(email: string, password: string): Observable<User>{
        return this.getUsers().pipe(
            map(
                (stream: User[]) => stream.find(user => user.email === email && user.password === password)
            )
        );
    }

    updateUser(user: User): Observable<any>{
        const url = `${this.url}/${user.id}`;

        return this.http.put(url, user);
    }

    deleteUser(id: number): Observable<any>{
        const url = `${this.url}/${id}`;

        return this.http.delete(url);
    }

    logout(): void{
        localStorage.removeItem('loggedUser');

        this.setIsLogged(false);
    }

    register(user: User): Observable<User>{
        return this.http.post<User>(this.url, user);
    }

    setLoggedUser(user: User): void{
        localStorage.setItem('loggedUser', JSON.stringify(user));

        this.setIsLogged(true);
    }

    getLoggedUser(): User{
        return JSON.parse(localStorage.getItem('loggedUser'));
    }

    setIsLogged(isLogged: boolean): void{
        this.isLogged$.next(isLogged);
    }

    getIsLogged(): Observable<boolean>{
        return this.isLogged$.asObservable();
    }
}
