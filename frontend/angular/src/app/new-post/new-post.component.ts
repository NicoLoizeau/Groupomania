import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';

const api = 'http://localhost:3000/api/user/';





@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  comment: string = ''
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  newPostSubmit(): void {
    const body = {
      text: this.comment
    }
    this.http.post(api, body)
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
