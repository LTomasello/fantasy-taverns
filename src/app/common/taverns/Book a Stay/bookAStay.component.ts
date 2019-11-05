import { OnInit, Component } from '@angular/core';
import { TavernService } from '../../tavern.service';
import { Router } from '@angular/router';


@Component({
    templateUrl: './bookAStay.component.html'

})
export class bookAStayComponent implements OnInit {
   // guest: IGuests[];

    constructor(private tavernService: TavernService, private router: Router) {
        
    }

  // get guests list from API and put in guests variable

  // set the value for date to today
  // this will be done when we bring the form in 

  // get rooms, but that should be based on the date
  // should be only available rooms


    ngOnInit(): void {


    }

    getRooms(): void {
        
    }


    ngOnDestroy(): void {}
   
   
}