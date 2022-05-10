import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private http: HttpClient, private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe
      (
        (result: any) => {
          this.id = result.id;
          this.loadInfoPublication(this.id);
        }
      )
  }
  clickAddComment(commentaire: any) {
    let body = {
      'commentaires': commentaire,
      'date': 15429,
      'user': sessionStorage['id'],
      'publication': this.id,
    }
    console.log(body)
    this.http.post(apiComment, body, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${sessionStorage['token']}`,
          'Content-Type': 'application/json'
        })
    })
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
}
