import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const login = document.getElementById('login');
const api = 'http://localhost:3000/api';
const email = document.getElementById('email');
const password = document.getElementById('password');


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
