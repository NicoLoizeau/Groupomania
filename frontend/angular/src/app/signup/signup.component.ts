import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const api = 'http://localhost:3000/api/user/signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  nom: string = '';
  email: string = '';
  password: string = '';
  photo: any;
  show: boolean = false;
  showMailError: boolean = false;
  showPasswordError: boolean = false;


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  signupSubmit(): void {
    let body = new FormData();
    body.append('nom', this.nom);
    body.append('email', this.email);
    body.append('password', this.password);
    body.append('photo', this.photo);
    console.log(body);

    this.http.post(api, body)
      .subscribe(
        (result) => {
          this.router.navigate(['/']);
          console.log(body);
        },
        (error) => {
          console.log(error)
        },
        () => {

        }
      )
  }
  changePhoto(event: any) {
    this.photo = event.target.files[0];
  }
  regExMail(event: any) {
    let regexMail: RegExp = /^\w+([\._-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regexMail.test(this.email)) {
      this.showMailError = false
    }
    else {
      this.showMailError = true
    }
  }
  regExPassword(event: any) {
    let regexPassword: RegExp = /^[a-zA-Z0-9]{8,50}$/;    //entre 8 et 50 alpha
    if (regexPassword.test(this.password)) {
      this.showPasswordError = false
    }
    else {
      this.showPasswordError = true
    }
  }

}
