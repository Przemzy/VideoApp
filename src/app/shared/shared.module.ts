import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule} from "@angular/material/dialog";
import {DashboardModule} from "../dashboard/dashboard.module";
import { SnackbarComponent } from './components/snackbar/snackbar.component';



@NgModule({
  declarations: [
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    DashboardModule
  ]
})
export class SharedModule { }
