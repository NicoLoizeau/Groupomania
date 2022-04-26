import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const api = 'http://localhost:3000/api/publication/';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  data: any = [];
  title: string = '';


  constructor(private http: HttpClient, private Headers: HttpHeaders) {

  }

  ngOnInit(): void {
    let headers: any = new Headers()
    headers.append('Authorization', `token ${sessionStorage['token']}`)
      ;

    console.log(this.Headers)

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
  }

}
