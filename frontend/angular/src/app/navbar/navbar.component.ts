import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  //auth: boolean = false

  ngOnInit(): void {
    /*if (sessionStorage['id'] = !undefined) {
      this.auth = true
    } else {
      this.auth = false
    }*/
  }
  clearSessionStorage() {
    this.router.navigate(['']);
    sessionStorage.clear();
    //this.auth = false
  }
}
