import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { myTavernsComponent } from './my-taverns/my-taverns.component';
import { AuthGuard } from '../auth/auth.guard';


const tavernRoutes: Routes = [
    { path: 'taverns', component: myTavernsComponent, canActivate: [AuthGuard] },
];


@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(tavernRoutes)],
})
export class tavernRoutingModule {}
