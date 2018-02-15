import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  username: string;
  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) {
  }

  ngOnInit() {
    this.setUsername();
  }

  setUsername() {
    if (this.authService.decodedToken) {
      this.username = this.authService.decodedToken.unique_name;
    } else { this.username = ''; }
  }

  login() {
    this.authService.login(this.model)
    .subscribe(data => {
      this.alertify.success('logged in successfully');
      this.setUsername();
    }, error => {
      this.alertify.error('Login Failed');
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.setUsername();
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
