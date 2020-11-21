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

const routes: Route[] = [
  {
    path: 'job-ads',
    component: CardListComponent
  },
  {
    path: 'job-ads/create',
    component: AdFormComponent
  },
  {
    path: 'job-ads/edit/:id',
    component: AdFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
    LoginComponent
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
