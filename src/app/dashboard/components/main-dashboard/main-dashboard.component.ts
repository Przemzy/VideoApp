import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServicesService} from "../../../_services/services.service";
import {DisplayOptionsEnum} from "../../../models/enums/displayOptionsEnum";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {HelperService} from "../../../_services/helper.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit, OnDestroy {

  removeVideoSubscription: Subscription
  setFavoriteVideoSubscription: Subscription

  displayOptions = DisplayOptionsEnum

  videoList: any
  allVideos : any

  display = this.displayOptions.blocks
  loadingVideos = true

  filter: any
  selectedChips = 'All'

  filters = [
    'Newest',
    'Oldest',
  ]


  constructor( private service: ServicesService,
               private helperService: HelperService,
               private dialog: MatDialog) {
    this.removeVideoSubscription = this.helperService.getUpdatedList().subscribe( itemName => {
      if (itemName) {
        const videoIndex = this.videoList.findIndex( (f: { name: any; })=> f.name == itemName)
        this.removeVideo(videoIndex)
        this.dialog.closeAll()
      }
    })

    this.setFavoriteVideoSubscription = this.helperService.getUpdatedFavorite().subscribe( item => {
      if (item) {
        this.setFavorite(item)
      }
    })
  }

  ngOnInit(): void {
    this.searchVimeoVideos()
  }

  handleChange(event: any){
    switch (event) {
      case 'Newest':
        this.setNewestVideos(this.allVideos)
        this.setNewestVideos(this.videoList)
        break
      case 'Oldest':
        this.setOldestVideos(this.allVideos)
        this.setOldestVideos(this.videoList)
        break
      case 'Favorites':
        return this.setFavoritesVideos()
      case 'All':
        this.selectedChips = 'All'
        return this.videoList = this.allVideos
      case 'Remove':
        this.allVideos.length = 0
        this.videoList.length = 0
        break
    }
  }

  setOldestVideos(list: any) {
    list.sort(function (a: { release_time:Date; }, b: { release_time:Date; }) {
      return new Date(a.release_time).getTime() - new Date(b.release_time).getTime();
    })
  }

  setNewestVideos(list: any) {
    list.sort(function (a: { release_time:Date; }, b: { release_time:Date; }) {
      return new Date(b.release_time).getTime() - new Date(a.release_time).getTime();
    })
  }

  setFavoritesVideos() {
    this.videoList = this.videoList.filter( (f: { isFavorite: boolean; }) => f.isFavorite);
    this.selectedChips = 'Favorites'
  }

  openModal(item: any, index: number) {
    this.dialog.open(ModalComponent, {data: {...item, index}})
  }

  searchVimeoVideos() {
    this.videoList = []
    this.allVideos = []

    this.service.searchVimeoVideos({query: 'angular'}).subscribe( data => {
      if (data) {
        data.data.forEach( (f: any) => {
          this.videoList.push({...f, isFavorite: false})
        })
      }
      this.loadingVideos = false
      this.allVideos = this.videoList
    })
  }

  removeVideo(index: number) {return this.videoList.splice(index, 1)}

  setFavorite(name: string) {
    const video = this.videoList.find( (f: { name: string; }) => f.name == name)
    return video.isFavorite = !video.isFavorite;
  }

  ngOnDestroy() {
    this.removeVideoSubscription.unsubscribe()
    this.setFavoriteVideoSubscription.unsubscribe()
  }
}
