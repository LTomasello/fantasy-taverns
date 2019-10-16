import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './SignUp.component.html',
})
export class SignUpComponent {
    userName = '';
    password = '';

    constructor(private router: Router, private authService: AuthService) {}

    signUp(): void {
        
        console.log(this.userName);
        console.log(this.password);
    }

    cancel(): void{
        this.router.navigateByUrl('/login');
    }

}
