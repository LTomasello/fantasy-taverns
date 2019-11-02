import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { myTavernsComponent } from './my-taverns/my-taverns.component';
import { AuthGuard } from '../auth/auth.guard';
import { InsertRoomsComponent } from './my-taverns/rooms/insertRooms.component';


const tavernRoutes: Routes = [
    { path: 'taverns', component: myTavernsComponent, canActivate: [AuthGuard] },
    { path: 'taverns/insert-rooms', component: InsertRoomsComponent},
];


@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(tavernRoutes)],
})
export class tavernRoutingModule {}
