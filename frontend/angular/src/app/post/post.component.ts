import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

const api = 'http://localhost:3000/api/publication/';
const apiComment = 'http://localhost:3000/api/commentaire/';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  data: any = {};
  dataComment: any = [];
  commentaire: any = '';
  id: any = '';
  date: Date = new Date();
  like = false;
  notlike = true;
  moderate = false;


  constructor(
    private http: HttpClient,
    private activatedRouter: ActivatedRoute,
    private datepipe: DatePipe,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe
      (
        (result: any) => {
          this.id = result.id;
          this.loadInfoPublication(this.id);
        }
      )
    if (sessionStorage['mod'] == 2) {
      this.moderate = true
    }

  }
  clickAddComment(commentaire: any) {
    let body = new FormData();
    body.append('commentaires', commentaire);
    body.append('date', this.datepipe.transform(this.date, 'yyyy-MM-dd') + '');
    body.append('user', sessionStorage['id']);
    body.append('publication', this.id);
    this.http.post(apiComment + this.id, body, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${sessionStorage['token']}`,
        })
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
  loadInfoPublication(id: any): void {
    this.http.get(api + id, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${sessionStorage['token']}`,
          'Content-Type': 'application/json'
        })
    })
      .subscribe(
        (result: any) => {
          this.data = result.list[0];
          this.loadInfoCommentaire(id)
        },
        (error) => {
          console.log(error)

        },
        () => {

        }
      )

  }
  loadInfoCommentaire(id: any): void {
    console.log('comment 1')
    this.http.get(apiComment + id, {
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
  clicklike() {
    if (this.like == false) {
      this.like = true;
      this.notlike = false;
    }
    else {
      this.like = false;
      this.notlike = true;
    }
  }
  clickDeleteCom(id: any): void {
    console.log(id)
    console.log(sessionStorage['id'])
    let body = {
      'idCom': id,
      'id': sessionStorage['id']
    }
    this.http.delete(apiComment, {
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


