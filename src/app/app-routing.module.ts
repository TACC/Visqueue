import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [

    { path : '' ,              component  : HomepageComponent },
    { path : 'detail/:name',   component : DetailComponent    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
