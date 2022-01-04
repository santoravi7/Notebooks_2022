import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';

import { NotebooksComponent } from '../notebooks/notebooks.component';

const routes: Routes=[
  { path: '', redirectTo:'/notebooks',pathMatch:'full'},
  { path: 'home', redirectTo:'/notebooks'},
  {path:'notebooks',component:NotebooksComponent},
  { path: "**", component:PagenotfoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent,
  NotebooksComponent,
  PagenotfoundComponent,
];