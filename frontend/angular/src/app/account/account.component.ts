import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


const api = 'http://localhost:3000/api/publication/:user/list';
const apiComment = 'http://localhost:3000/api/commentaire/';
const apiDelete = 'http://localhost:3000/api/publication/';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  data: any = [];
  dataComment: any = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get(api.replace(':user', sessionStorage['id']))
      .subscribe(
        (result: any) => {
          this.data = result.list;
          console.log(this.data);
        },
        (error) => {
          console.log(error)

        },
        () => {

        }
      )
    this.http.get(apiComment)
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
      )
  }
  clickDelete(id: any): void {
    console.log(id)
    console.log(sessionStorage['id'])
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
          this.router.navigate(['main']);
        },
        (error) => {
          console.log(error)

        },
        () => {

        }
      )

  }

}
