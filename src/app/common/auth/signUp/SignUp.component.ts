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

        this.tavernService.getAllTaverns().subscribe(
            (Response) => {
                console.log(Response, "Response here");
                this.taverns = Response;
            },
            (error) => {
                console.log(error);
            }
            
        )
    }

    signUp(): void {
        

        let user: {};
        console.log('role:', this.role, "role call");
        if (this.role === 'Admin'){
            user = {
                UserName: this.userName,
                Password: this.password,
                Tavern: {
                    ID: 0,
                    TavernName: this.tavernName
                }
                
            }
            console.log(user, "Admin call");
        }
        else if (this.role = 'Manager') {
            user = {
                UserName: this.userName,
                Password: this.password,
                Tavern: this.selectTavern
            }
        }
        console.log(user, "Manager Call");
        
        this.authService.create(user).subscribe((answer) => {
             this.router.navigateByUrl('/login');
        });

    }
    
    
    cancel(): void{
        this.router.navigateByUrl('/login');
    }

}

