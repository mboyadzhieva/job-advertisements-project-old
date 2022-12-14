import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { CardListViewComponent } from './card-list-view/card-list-view.component';
import { CardItemComponent } from './card-item/card-item.component';
import { AdFormComponent } from './ad-form/ad-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardListComponent } from './card-list/card-list.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { NonAuthGuard } from './auth/guards/non-auth.guard';
import { ProfileComponent } from './auth/profile/profile.component';
import { UserAdsComponent } from './auth/user-ads/user-ads.component';

const routes: Route[] = [
  {
    path: 'job-ads',
    component: CardListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'job-ads/create',
    component: AdFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'job-ads/edit/:id',
    component: AdFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/ads',
    component: UserAdsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: CardListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    CardListViewComponent,
    CardItemComponent,
    AdFormComponent,
    CardListComponent,
    ErrorMessageComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UserAdsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
