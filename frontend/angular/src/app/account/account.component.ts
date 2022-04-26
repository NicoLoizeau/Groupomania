import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const api = 'http://localhost:3000/api/publication/:user/list';
const apiComment = 'http://localhost:3000/api/commentaire/';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  data: any = [];
  dataComment: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(api.replace(':user', '4'))
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
