import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';

const api = 'http://localhost:3000/api/publication/';
const apiComment = 'http://localhost:3000/api/commentaire/';
const apiDelete = 'http://localhost:3000/api/publication/';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  data: any = [];
  dataComment: any = [];
  id: any = '';
  moderate = false;


  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.http.get(api, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${sessionStorage['token']}`,
          'Content-Type': 'application/json'
        })
    })
      .subscribe(
        (result: any) => {
          this.data = result.list;
          this.loadInfoCommentaire();
        },
        (error) => {
          console.log(error)

        },
        () => {

        }
      )
    if (sessionStorage['mod'] === 2) {
      this.moderate = true
    }
  }

  clickNavigate(id: any): void {
    this.router.navigate([
      'main/post', id
    ])
  }
  loadInfoCommentaire(): void {
    this.http.get(apiComment + this.data.id, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${sessionStorage['token']}`,
          'Content-Type': 'application/json'
        })
    })
      .subscribe(
        (result: any) => {
          this.dataComment = result.list;
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

}
