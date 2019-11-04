import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface ITavern {
    ID: number,
    TavernName: string,
}

export interface IRooms {
    ID: number,
    TavernID: number,
    RoomName: string,
    RoomStatus: string,
    DailyRate: string

}

@Injectable({
    providedIn: 'root'
})

export class TavernService {
    constructor(private http: HttpClient) { }

    getAllTaverns(): Observable<any> {
        return this.http.get<any>('http://localhost:3000/tavernList');
    }

    getMyTaverns(): Observable<ITavern> { 
        return this.http.get<ITavern>('http://localhost:3000/my-taverns');
    }

    getTavernRooms(RoomName: string): Observable<IRooms[]> {
        return this.http.get<IRooms[]>(`http://localhost:3000/tavern-rooms?RoomName=${RoomName}`);
    }

    addRoom(room: IRooms): Observable<IRooms> {
        return this.http.post<IRooms> ('http://localhost:3000/tavern-rooms', room);
    }
}


   
