import { Component } from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user_name: any;
  password: any;
  branch: any = "Branch 1";
  role: any;

  loggedInUser: any = null;

  constructor(
    private api: ApicallService,  private toaster: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}
  getBranch(event: any) {
    this.branch = event.target.value;
    this.branch + '';
  }
  login() {
    this.authService.login(
      this.user_name,
      this.password,
      this.branch
    );

  }
}
