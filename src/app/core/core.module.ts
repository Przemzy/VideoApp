import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {MatList, MatListModule, MatNavList} from '@angular/material/list';





@NgModule({
  declarations: [
    MenuComponent,
    ToolbarComponent
  ],
  exports: [
    MenuComponent,
    MatToolbarModule,
    ToolbarComponent,
    MatNavList,
    MatList
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    MatListModule
  ]
})
export class CoreModule { }
