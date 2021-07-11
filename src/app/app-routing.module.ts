import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainDashboardComponent} from "./dashboard/components/main-dashboard/main-dashboard.component";
import {VideosOptionsComponent} from "./dashboard/components/videos-options/videos-options.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainDashboardComponent
  },
  {
    path: 'dashboard/options',
    component: VideosOptionsComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
