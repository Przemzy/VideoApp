import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule} from "@angular/material/dialog";
import {DashboardModule} from "../dashboard/dashboard.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    DashboardModule
  ]
})
export class SharedModule { }
