import { Component, OnInit } from "@angular/core";
import { TavernService } from '../../../tavern.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    templateUrl: './insertRooms.component.html'

})
export class InsertRoomsComponent implements OnInit {
    constructor(private tavernService: TavernService, private router: Router) {}

   // taverns = TavernService;


    ngOnInit(): void {}

    saveRoom(roomForm: NgForm): void {
        if(roomForm.valid) {
            this.tavernService.save(roomForm.value).subscribe((answer) => {
                this.router.navigateByUrl('/taverns');
            });
        }
    };
}