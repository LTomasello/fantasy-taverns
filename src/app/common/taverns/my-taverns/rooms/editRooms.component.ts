import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './editRooms.component.html'
})
export class editRoomsComponent implements OnInit {
  room: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // snapshot way
   // console.log('thing', this.route.snapshot.params.room);

    // observable way
    this.route.paramMap.subscribe(params => {
      console.log(params.get('room'));
      this.room = params.get('room');
    });
  }

}