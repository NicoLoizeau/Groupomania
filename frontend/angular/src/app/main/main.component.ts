import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';

const api = 'http://localhost:3000/api/publication/';
const apiComment = 'http://localhost:3000/api/commentaire/';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  data: any = [];
  dataComment: any = [];
  id: any = '';


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
          console.log(result.list)
          this.dataComment = result.list;
        },
        (error) => {
          console.log(error)

        },
        () => {

        }
      )
  }

}
