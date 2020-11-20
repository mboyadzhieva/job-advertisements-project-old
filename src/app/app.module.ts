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
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
