import { Component, OnInit, OnDestroy } from "@angular/core";
import { TavernService, ITavern, IRooms } from '../../tavern.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
    selector: 'app-my-taverns',
    templateUrl: './my-taverns.component.html'

})
export class myTavernsComponent implements OnInit, OnDestroy {

    myTaverns: ITavern;
    tavernRooms: IRooms[];
    searchText = '';
    searchUpdated = new Subject<string>();
    subscription = new Subscription();

    constructor(private tavernService: TavernService) {
        this.subscription = this.searchUpdated
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
            )
            .subscribe((newValue) => {
                this.tavernService.getTavernRooms(newValue).subscribe((tavernRooms) => (this.tavernRooms = tavernRooms));
            })
    }

    


    ngOnInit(): void {
        this.tavernService.getMyTaverns().subscribe(
        (response)=>{
             this.myTaverns = response;
            console.log(response, "Taverns Here");
        },
        (error) => {
            console.log(error);
        })

        this.tavernService.getTavernRooms('').subscribe((tavernRooms) => (this.tavernRooms = tavernRooms));
        
       
 
    }

    trackById(index: number, item: IRooms) {
        return item.ID;
    }

  

    search($event): void {
        this.searchUpdated.next($event.target.value);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

