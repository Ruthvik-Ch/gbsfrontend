import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from './apicall.service';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUserSubject = new BehaviorSubject<any>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor(private api: ApicallService,  private toaster: ToastrService, private router: Router) {
    const dataStr = localStorage.getItem('loggedInUserGBS');
    if (dataStr) {
      this.loggedInUserSubject.next(JSON.parse(dataStr));
    }
  }

  login(userName: any, password: any, branch: string) {
    console.log('Data in auth serv :', userName, password, branch);
    // If user with same username already loggedin then dont login again
    if (this.loggedInUserSubject.value && this.loggedInUserSubject.value.userName === userName) {
      this.navigateUserByRole(this.loggedInUserSubject.value);
    } else {
      let data = {
        userName: userName,
        password: password,
      };
      this.api.postApi('api/user/' + branch, data).subscribe(
        (response) => {
          // response = {"status": "SUCCESS","userName": "Exp2","role": "owner"}
          this.loggedInUserSubject.next(response);
          localStorage.setItem('loggedInUserGBS', JSON.stringify(response));
          this.navigateUserByRole(response);
        },
        (error) => {
          // failed to login popup
          console.error(error);
        }
      );
    }
  }

  navigateUserByRole(loggedInUser: any) {
    if (loggedInUser && loggedInUser.role === 'owner') {
      // Role based routing here
      this.router.navigate(['./dashboard']);
    }
  }

  logout() {
    localStorage.removeItem('loggedInUserGBS');
    this.loggedInUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.loggedInUserSubject.value;
  }
}