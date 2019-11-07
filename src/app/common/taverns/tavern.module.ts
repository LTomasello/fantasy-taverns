import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { tavernRoutingModule } from '../taverns/tavern-routing.module';
import { myTavernsComponent } from './my-taverns/my-taverns.component';
import { InsertRoomsComponent } from './my-taverns/rooms/insertRooms.component';
import { bookAStayComponent } from './Book a Stay/bookAStay.component';
import { editRoomsComponent } from './my-taverns/rooms/editRooms.component';


@NgModule({
    declarations: [myTavernsComponent, InsertRoomsComponent, bookAStayComponent, editRoomsComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        tavernRoutingModule,
    ],
})
export class tavernModule {}
