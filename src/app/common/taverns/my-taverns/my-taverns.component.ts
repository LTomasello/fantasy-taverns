import { Component, OnInit } from "@angular/core";
import { TavernService, ITavern } from '../../tavern.service';


@Component({
    templateUrl: './my-taverns.component.html'

})
export class myTavernsComponent implements OnInit {

    taverns: ITavern[];

    constructor(private tavernService: TavernService) {}

    


    ngOnInit(): void {
        this.tavernService.getAll().subscribe((taverns)=>{
             this.taverns = taverns;
            console.log(taverns, "Taverns Here");
        })
        
    }
}