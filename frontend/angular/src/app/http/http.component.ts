import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { observable } from 'rxjs';
import { PostComponent } from '../post/post.component';

const api = 'http://localhost:3000/api';


@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

}
