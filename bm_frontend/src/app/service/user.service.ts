import { Injectable } from '@angular/core';
import { User } from '../data/user';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable()
export class UserService {
    constructor(private conexHttp: HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute) { };
    
}
