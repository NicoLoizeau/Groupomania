import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

const apiUser = 'http://localhost:3000/api/user';
const api = 'http://localhost:3000/api/publication/:user/list';
const apiComment = 'http://localhost:3000/api/commentaire/';
const apiDelete = 'http://localhost:3000/api/publication/';
const apiDeleteAccount = 'http://localhost:3000/api/user/delete/:user';
const apiUpdateAccount = 'http://localhost:3000/api/user/update/:user';

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
  photoErrorMessage: Boolean = false;
  photoValidateMessage: Boolean = false;
  email: any = sessionStorage['email'];
  photoErrorPassword: Boolean = false;
  regexPassword: RegExp = /^[a-zA-Z0-9]{8,50}$/;    //entre 8 et 50 alpha
  ErrorPassword: boolean = false;
  passwordValidateMessage: boolean = false;


  constructor(private http: HttpClient,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

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
          this.dataUser = result.list[0];
        },
        (error) => {
          console.log(error)

        },
        () => {

        }
      )

    this.http.get(api.replace(':user', sessionStorage['id']), {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${sessionStorage['token']}`,
          'Content-Type': 'application/json'
        })
    })
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
  }
  clickDelete(id: any, image: any): void {
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
          window.location.reload();
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
  clickNewPhoto(): void {
    if (this.photo === undefined) {
      this.photoErrorMessage = true;
    } else {
      const body = new FormData();
      body.append('photo', this.photo);
      body.append('email', this.email);
      body.append('id', sessionStorage['id'])
      this.http.put(apiUpdateAccount.replace(':user', sessionStorage['id']), body, {
        headers: new HttpHeaders(
          {
            'Authorization': `Bearer ${sessionStorage['token']}`,
          })
      })
        .subscribe(
          (result) => {
            this.user();
            this.photoErrorMessage = false;
          },
          (error) => {
            console.log(error)
          },
          () => {

          }
        )

    }
  }
  changePassword(password: any): void {
    if (this.password != undefined && this.regexPassword.test(password)) {
      const body = new FormData();
      body.append('password', password);
      body.append('email', this.email);
      body.append('id', sessionStorage['id'])
      this.http.put(apiUpdateAccount.replace(':user', sessionStorage['id']), body, {
        headers: new HttpHeaders(
          {
            'Authorization': `Bearer ${sessionStorage['token']}`,
          })

      })
        .subscribe(
          (result) => {
            this.passwordValidateMessage = true;
            this.ErrorPassword = false;
          },
          (error) => {
            console.log(error)
          },
          () => {

          }
        )

    } else {
      this.ErrorPassword = true;
    }
  }

  user(): void {
    this.http.get(apiUser, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${sessionStorage['token']}`,
          'Content-Type': 'application/json'
        })
    })
      .subscribe(
        (result: any) => {
          this.dataUser = result.list[0];
        },
        (error) => {
          console.log(error)

        },
        () => {

        }
      )
  }
  clickNavigate(id: any): void {
    this.router.navigate([
      'main/post', id
    ])
  }

}