import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      console.log('logged in successfully');
    }, error => {
      console.log('login failed');
    });
  }

loggedIn() {
  const token = localStorage.getItem('token');
  return !!token;
}

logout() {
  this.authService.userToken = null;
  localStorage.removeItem('token');
  console.log('logged out');
}

}
