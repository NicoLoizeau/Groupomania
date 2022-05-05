import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';

const api = 'http://localhost:3000/api/publication/';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  data: any = [];
  title: string = '';


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
