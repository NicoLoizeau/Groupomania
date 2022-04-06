import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';

const api = 'http://localhost:3000/api/user/login';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  data: any = [];
  show: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  loginSubmit(): void {
    console.log(this.email);
    console.log(this.password);
    const body = {
      email: this.email,
      password: this.password
    }
    this.http.post(api, body)
      .subscribe(
        (result) => {
          this.data = result;
          sessionStorage.setItem('token', this.data.token);
          sessionStorage.setItem('id', this.data.id);

          this.router.navigate(['main']);
          console.log(sessionStorage.getItem('token'))
        },
        (error) => {
          this.show = true;
          console.log(error)

        },
        () => {

        }
      )
  }
}
