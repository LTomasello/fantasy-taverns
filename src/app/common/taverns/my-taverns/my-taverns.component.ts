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
                this.searchRooms(newValue);
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

        this.searchRooms('');
        
       /* this.tavernService.getTavernRooms().subscribe(
            (Response)=>{
                this.tavernRooms = Response;
                console.log(Response, "Rooms Here")
            },
            (error) => {
                console.log(error, "rooms error")
            }
        ) */
    }

    searchRooms(newValue: string): void {
        this.tavernService.getTavernRooms(newValue).subscribe((rooms) => {
            this.tavernRooms = rooms;
        })
    }

    search($event): void {
        this.searchUpdated.next($event.target.value);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

