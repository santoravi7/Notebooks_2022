import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {AppRoutingModule, routingComponents} from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotebooksService } from './notebooks.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports:      [ BrowserModule, 
    FormsModule, 
    AppRoutingModule,
    NgbModule,
    ModalModule.forRoot() ],
  declarations: [ AppComponent, NavbarComponent, routingComponents ],
  bootstrap:    [ AppComponent ],
  providers:[NotebooksService],
})
export class AppModule { }
