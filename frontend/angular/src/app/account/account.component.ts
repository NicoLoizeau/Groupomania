import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

const apiUser = 'http://localhost:3000/api/user';
const api = 'http://localhost:3000/api/publication/:user/list';
const apiComment = 'http://localhost:3000/api/commentaire/';
const apiDelete = 'http://localhost:3000/api/publication/';
const apiDeleteAccount = 'http://localhost:3000/api/user/delete/:user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  data: any = [];
  dataComment: any = [];
  dataUser: any = [];
  photo: any;
  password: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get(apiUser, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${sessionStorage['token']}`,
          'Content-Type': 'application/json'
        })
    })
      .subscribe(
        (result: any) => {
          this.dataUser = result.list;
        },
        (error) => {
          console.log(error)

        },
        () => {

        }
      )

    this.http.get(api.replace(':user', sessionStorage['id']))
      .subscribe(
        (result: any) => {
          if (result === undefined) {

          }
          else {
            this.data = result.list;
          }
        },
        (error) => {
          console.log(error)

        },
        () => {

        }
      )
    /*this.http.get(apiComment)
      .subscribe(
        (result: any) => {
          this.dataComment = result.list;
          console.log(this.dataComment);
        },
        (error) => {
          console.log(error)

        },
        () => {

        }
      )*/
  }
  clickDelete(id: any): void {
    let body = {
      'idPub': id,
    }
    this.http.delete(apiDelete, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${sessionStorage['token']}`,
          'Content-Type': 'application/json'
        }),
      body
    })
      .subscribe(
        (result) => {
          this.router.navigate(['account']);
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

  deleteAccount(): void {
    console.log(this.dataUser[0].email)

    let body = {
      'email': this.dataUser[0].email

    }
    this.http.delete(apiDeleteAccount.replace(':user', sessionStorage['id']), {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${sessionStorage['token']}`,
          'Content-Type': 'application/json'
        }),
      body
    })
      .subscribe(
        (result) => {
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error)

        },
        () => {

        }
      )

  }
  clickNewPost() {
    this.router.navigate(['main/newPost'])
  }
}
