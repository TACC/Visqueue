import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FronteraComponent } from './frontera/frontera.component';
import { Stampede2Component } from './stampede2/stampede2.component';

const routes: Routes = [

    { path : '' , component  : HomepageComponent },
    { path : 'frontera', component : FronteraComponent },
    { path : 'stampede2', component : Stampede2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
