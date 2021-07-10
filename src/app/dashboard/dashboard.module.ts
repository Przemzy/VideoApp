import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayVideoComponent } from './components/display-video/display-video.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import {FormsModule} from "@angular/forms";
import {YouTubePlayerModule} from "@angular/youtube-player";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";


@NgModule({
  declarations: [
    DisplayVideoComponent,
    MainDashboardComponent,
  ],
  exports: [
    MainDashboardComponent,
    DisplayVideoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    YouTubePlayerModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatChipsModule
  ]
})
export class DashboardModule { }
