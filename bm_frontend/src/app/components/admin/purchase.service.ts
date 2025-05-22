import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class PurchaseService {
    private apiUrl = 'http://127.0.0.1:8000/purchases';

    constructor(private http: HttpClient) { }

    getPurchases(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}`);
    }

    countPurchases(): Observable<any[]> {
        return this.getPurchases().pipe(
            map(purchases => purchases.filter(purchase => purchase.id !== null)),
            catchError(error => {
                return [];
            })
        );
    }
}