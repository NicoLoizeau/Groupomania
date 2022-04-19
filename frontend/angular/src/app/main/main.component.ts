import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const api = 'http://localhost:3000/api/publication/';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  data: any = [];
  pub: any = [];
  title: string = '';

  constructor(private http: HttpClient, private _renderer: Renderer2) { }

  ngOnInit(): void {
    this.http.get(api)
      .subscribe(
        (result: any) => {
          this.data = result.list;
          this.pub = this.data
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
