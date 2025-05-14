import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CreateProduct {
    constructor(private conexHttp: HttpClient) { }
    postProduct(user_id: number, name: string, description: string, category: string, price: number, image: string): Observable<any> {
        let product = {
            "user_id": user_id,
            "name": name,
            "description": description,
            "category": category,
            "price": price,
            "image": image
        };
        let url = "http://127.0.0.1:8000/productos/new";
        return this.conexHttp.post(url, product, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }
}