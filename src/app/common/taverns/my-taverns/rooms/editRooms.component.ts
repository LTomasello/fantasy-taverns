import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TavernService, IRooms } from '../../../tavern.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './editRooms.component.html'
})
export class editRoomsComponent implements OnInit {
  room: IRooms;
  private sub: any;
  fg: FormGroup;

  constructor(private route: ActivatedRoute, private tavernService: TavernService, private router: Router, private formBuilder: FormBuilder) {}


  cancel(): void {
    this.router.navigateByUrl('/taverns');
  }

  editRoom() {
    this.room.RoomName = this.fg.value.roomName;
    this.room.DailyRate = this.fg.value.dailyRate;

    this.tavernService.save(this.room).subscribe(
          (response) => {
            if (response.success) {
                this.router.navigateByUrl('/taverns');
                
            }
          },
          (error) => {
            console.log('update failed')
          },
    );
  }


  ngOnInit() {

    this.fg = this.formBuilder.group({
      roomName: ['', Validators.required],
      dailyRate: ['', Validators.required]
    })

   
    this. sub = this.route.paramMap.subscribe(params => {
              if (params['id'] != undefined) {
                  let id = params['id'];
                  this.tavernService.getRoom(id).subscribe(rooms => {
                      this.room = rooms;
                      this.fg.controls['roomName'].setValue(this.room.RoomName);
                      this.fg.controls['dailyRate'].setValue(this.room.DailyRate);
                  });
                } else {
                      this.room = <IRooms>{};
                      this.room.ID = 0;
                }
              });
    
  }

  get roomName() { return this.fg.get('roomName'); }
  get dailyRate() { return this.fg.get('dailyRate'); }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}