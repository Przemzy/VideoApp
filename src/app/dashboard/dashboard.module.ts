import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayVideoComponent } from './components/display-video/display-video.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {YouTubePlayerModule} from "@angular/youtube-player";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import { VideosOptionsComponent } from './components/videos-options/videos-options.component';
import {RouterModule} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from "@angular/material/snack-bar";



@NgModule({
  declarations: [
    DisplayVideoComponent,
    MainDashboardComponent,
    VideosOptionsComponent,
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
    MatChipsModule,
    RouterModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule
  ]
})
export class DashboardModule { }
