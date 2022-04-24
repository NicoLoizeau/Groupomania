import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const api = 'http://localhost:3000/api/publication/:id';
const apiComment = 'http://localhost:3000/api/commentaire/';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  data: any = [];
  dataComment: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(api)
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

}
