import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Advertisement } from './advertisement.interface';

@Injectable({
    providedIn: 'root'
})
export class AdService {

    url = 'http://localhost:3000/advertisements';

    constructor(private http: HttpClient){
    }

    getAds(): Observable<Advertisement[]> {
        return this.http.get<Advertisement[]>(this.url);
    }

    getAdById(id: number): Observable<Advertisement>{
        const url = `${this.url}/${id}`;

        return this.http.get<Advertisement>(url);
    }

    createAd(ad: Advertisement): Observable<any>{
        return this.http.post(this.url, ad);
    }

    updateAd(ad: Advertisement): Observable<any>{
        const url = `${this.url}/${ad.id}`;

        return this.http.put(url, ad);
    }

    deleteAd(id: number): Observable<any>{
        const url = `${this.url}/${id}`;

        return this.http.delete(url);
    }
}
