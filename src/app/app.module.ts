import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {AppRoutingModule, routingComponents} from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotebooksService } from './notebooks.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InMemoryDataService } from './in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { CommonModule } from '@angular/common';
// import { ModalModule } from 'ngx-bootstrap';


@NgModule({
  imports:      [
    CommonModule,
    BrowserModule, 
    FormsModule, 
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService,{
      dataEncapsulation:false
    }) 
  ],
  declarations: [ AppComponent, NavbarComponent, routingComponents ],
  bootstrap:    [ AppComponent ],
  providers:[NotebooksService],
})
export class AppModule { }
