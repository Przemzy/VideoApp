import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainDashboardComponent} from "./dashboard/components/main-dashboard/main-dashboard.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainDashboardComponent,
    children: [
      {
        path: 'favourites',
        component:MainDashboardComponent
      }
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
