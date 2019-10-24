import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { tavernRoutingModule } from '../taverns/tavern-routing.module';
import { myTavernsComponent } from './my-taverns/my-taverns.component';


@NgModule({
    declarations: [myTavernsComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        tavernRoutingModule,
    ],
})
export class tavernModule {}
