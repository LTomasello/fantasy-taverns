import { Component, OnInit } from "@angular/core";
import { TavernService, ITavern, IRooms } from '../../tavern.service';


@Component({
    selector: 'app-my-taverns',
    templateUrl: './my-taverns.component.html'

})
export class myTavernsComponent implements OnInit {

    myTaverns: ITavern;
    tavernRooms: IRooms[];

    constructor(private tavernService: TavernService) {}

    


    ngOnInit() {
        this.tavernService.getMyTaverns().subscribe(
        (response)=>{
             this.myTaverns = response;
            console.log(response, "Taverns Here");
        },
        (error) => {
            console.log(error);
        })
        
        this.tavernService.getTavernRooms().subscribe(
            (Response)=>{
                this.tavernRooms = Response;
                console.log(Response, "Rooms Here")
            },
            (error) => {
                console.log(error, "rooms error")
            }
        )
    }
}

