import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './common/auth/login/login.component';
import { SignUpComponent } from './common/auth/signUp/SignUp.component'
import { TokenInterceptor } from './common/auth/token.interceptor';
import { HomeComponent } from './home.component';
import { tavernModule } from './common/taverns/tavern.module';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, LoginComponent, SignUpComponent, HomeComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        tavernModule,
        AppRoutingModule,
        CookieModule.forRoot(),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ],
})
export class AppModule {}
