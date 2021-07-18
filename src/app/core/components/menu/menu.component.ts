import { Component, OnInit } from '@angular/core';
import {HelperService} from "../../../_services/helper.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  pages = [
    {name: 'All videos', link: '/dashboard'},
    {name: 'Options', link: '/dashboard/options'}
  ];

  selectedOption = 'All videos'
  menuOptions: Subscription

  constructor( private helperService: HelperService, private router: Router) {
    this.menuOptions = this.helperService.updateMenuItem().subscribe( data => {
      if (data == undefined || null) {
        this.selectedOption = data
        this.setRouting()
      }
    })
  }

  ngOnInit(): void {
  }

  setRouting() {
    // @ts-ignore
    const link: string = this.pages.find( f => f.name == this.selectedOption).link
    console.log(link)
    this.router.navigate([link])
  }

  selectMenuItem(item: string) {
    this.helperService.setMenuItem(item)
  }

}
