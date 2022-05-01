import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const api = 'http://localhost:3000/api/publication/';





@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  titre: string = '';
  description: string = '';
  image: any;
  date: Date = new Date();
  user: number = sessionStorage['id'];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  newPostSubmit(): void {
    const body = {
      titre: this.titre,
      description: this.description,
      image: this.image,
      date: this.date.toISOString().split('T')[0], // à revoir
      user: this.user
    }
    this.http.post(api, body, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${sessionStorage['token']}`,
          'Content-Type': 'application/json'
        })
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
