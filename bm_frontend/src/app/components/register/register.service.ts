import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CreateUser{
    constructor(private conexHttp:HttpClient){}
    postUsers(name: string, surname: string, password: string, mail: string): Observable<any>{
        let user = ({"name": name, "surname": surname, "password": password, "mail": mail})
        let url = "http://127.0.0.1:8000/users/new";
        console.log(user);
        return this.conexHttp.post(url, user,
            { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
            );
    }
}