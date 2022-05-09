import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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
  user: string = sessionStorage['id'];

  constructor(
    private http: HttpClient,
    private router: Router,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
  }
  newPostSubmit(): void {
    const body = new FormData();
    body.append('titre', this.titre);
    body.append('description', this.description);
    body.append('image', this.image);
    body.append('date', this.datepipe.transform(this.date, 'yyyy-MM-dd') + '');
    body.append('user', this.user);

    this.http.post(api, body, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${sessionStorage['token']}`,
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
  changePhoto(event: any) {
    this.image = event.target.files[0];
  }
}
