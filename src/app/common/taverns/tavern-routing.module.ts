import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { myTavernsComponent } from './my-taverns/my-taverns.component';
import { AuthGuard } from '../auth/auth.guard';
import { InsertRoomsComponent } from './my-taverns/rooms/insertRooms.component';
import { bookAStayComponent } from './Book a Stay/bookAStay.component';
import { editRoomsComponent } from './my-taverns/rooms/editRooms.component';


const tavernRoutes: Routes = [
    { path: 'taverns', component: myTavernsComponent, canActivate: [AuthGuard] },
    { path: 'taverns/insert-rooms', component: InsertRoomsComponent, canActivate: [AuthGuard]},
    { path: 'taverns/booking', component: bookAStayComponent, canActivate: [AuthGuard]},
    { path: 'taverns/:room', component: editRoomsComponent, canActivate: [AuthGuard]},
];


@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(tavernRoutes)],
})
export class tavernRoutingModule {}
