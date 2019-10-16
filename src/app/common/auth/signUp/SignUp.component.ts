import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RadioControlValueAccessor } from '@angular/forms';

@Component({
    templateUrl: './SignUp.component.html',
})
export class SignUpComponent {
    userName = '';
    password = '';
    Manager = '';
    Admin = '';

    constructor(private router: Router, private authService: AuthService) {}

    signUp(): void {
        const user = {userName: 'ltomasello2462@gmail.com', password: 'cloud7'};
            this.authService.create(user).subscribe((answer) => {
                this.router.navigateByUrl('/login')
        
        });
    }

    cancel(): void{
        this.router.navigateByUrl('/login');
    }

    admin(): void{

    }

}
