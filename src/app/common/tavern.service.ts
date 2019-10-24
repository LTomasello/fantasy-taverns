import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface ITavern {
    id: number;
    Name: string;
}

@Injectable({
    providedIn: 'root'
})

export class TavernService {
    constructor(private http: HttpClient) { }

    getTaverns(): Observable<any> {
        return this.http.get('http://localhost:3000/tavernList');
    }

    getAll(): Observable<ITavern[]> { 
        return this.http.get<ITavern[]>('http://localhost:3000/taverns');
    }
}


   
