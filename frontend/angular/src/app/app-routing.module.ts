import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { HttpComponent } from './http/http.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostComponent } from './post/post.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '', component: HttpComponent, children: [
      { path: 'main', component: MainComponent },
      { path: 'main/post/:id', component: PostComponent },
      { path: 'main/newPost', component: NewPostComponent },
      { path: 'account', component: AccountComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
