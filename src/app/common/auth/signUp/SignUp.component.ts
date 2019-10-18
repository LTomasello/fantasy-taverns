import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TavernService } from '../../tavern.service';
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';

@Component({
    templateUrl: './SignUp.component.html',
})
export class SignUpComponent {
    userName = '';
    password = '';
    role ='';
    tavernName = ''
    taverns = [];
    selectTavern = null;
   

    constructor(private router: Router, private authService: AuthService, private tavernService: TavernService) {

        this.tavernService.getTaverns().subscribe(
            (Response) => {
                console.log(Response);
                this.taverns = Response;
            },
            (error) => {
                console.log(error);
            }
            
        )
    }

    signUp(): void {
        // work from class
        /*const user = {userName: 'ltomasello2462@gmail.com', password: 'cloud7'};
            this.authService.create(user).subscribe((answer) => {
                this.router.navigateByUrl('/login')
        
        });*/

        let user: {};

        if (this.role === 'admin'){
            user = {
                UserName: this.userName,
                Password: this.password,
                Tavern: {
                    ID: 0,
                    tavernName: this.tavernName
                }
            }
        }
        else if (this.role = 'manager') {
            user = {
                UserName: this.userName,
                Password: this.password,
                Tavern: this.selectTavern
            }
        }
        console.log(this.userName, this.password, this.tavernName);

    }
    
    
    cancel(): void{
        this.router.navigateByUrl('/login');
    }

    roleValue() {
        console.log('ngModel value', this.role );
    }

}

