import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GBS-Frontend';
  loggedInUser: any = null;
  constructor(public router: Router, public authService: AuthService){}
  ngOnInit(){
    this.authService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
    });
  }

}
