import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServicesService} from "../../../_services/services.service";
import {DisplayOptionsEnum} from "../../../models/enums/displayOptionsEnum";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {HelperService} from "../../../_services/helper.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {SnackbarComponent} from "../../../shared/components/snackbar/snackbar.component";


@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
  providers: [SnackbarComponent]
})
export class MainDashboardComponent implements OnInit, OnDestroy {

  removeVideoSubscription: Subscription
  setFavoriteVideoSubscription: Subscription

  displayOptions = DisplayOptionsEnum

  videoList: any
  allVideos: any

  display = this.displayOptions.blocks
  loadingVideos = true

  filter: any
  selectedChips = 'All'

  filters = [
    'Newest',
    'Oldest',
  ]


  constructor(private service: ServicesService,
              private helperService: HelperService,
              private dialog: MatDialog,
              private router: Router,
              private snackbar: SnackbarComponent,) {
    this.removeVideoSubscription = this.helperService.getUpdatedList().subscribe(itemUri => {
      if (itemUri) {
        const videoIndex = this.videoList.findIndex((f: { uri: any; }) => f.uri == itemUri)
        this.removeVideo(videoIndex)
        this.dialog.closeAll()
      }
    })

    this.setFavoriteVideoSubscription = this.helperService.getUpdatedFavorite().subscribe(item => {
      if (item) {
        this.setFavorite(item)
      }
    })
  }

  ngOnInit(): void {
    if ('deleteAllVideos' in localStorage) {
      const deleteVideos = localStorage.deleteAllVideos

      if (deleteVideos) {
        this.videoList = []
        this.allVideos = []
        this.loadingVideos = false
        localStorage.removeItem('deleteAllVideos')
      } else {
        this.searchVimeoVideos()
      }
    } else {
      this.searchVimeoVideos()
    }
  }

  handleChange(event: any) {
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
    list.sort(function (a: { release_time: Date; }, b: { release_time: Date; }) {
      return new Date(a.release_time).getTime() - new Date(b.release_time).getTime();
    })
  }

  setNewestVideos(list: any) {
    list.sort(function (a: { release_time: Date; }, b: { release_time: Date; }) {
      return new Date(b.release_time).getTime() - new Date(a.release_time).getTime();
    })
  }

  setFavoritesVideos() {
    this.videoList = this.videoList.filter((f: { isFavorite: boolean; }) => f.isFavorite);
    this.selectedChips = 'Favorites'
  }

  openModal(item: any) {
    this.dialog.open(ModalComponent, {data: {...item}})
  }

  getVideosFromStorage() {
    if ('newVideo' in localStorage) {
      const newVideo = JSON.parse(localStorage.newVideo)
      this.videoList.push({...newVideo, isFavorite: false})
      this.allVideos.push({...newVideo, isFavorite: false})

      localStorage.removeItem('newVideo');
    }

    if ('videoList' in localStorage) {
      const newList = Array.from(JSON.parse(localStorage.videoList))
      newList.map( f => Object.assign(f, {isFavorite: false}))

      this.videoList.push(...newList)
      this.allVideos.push(...newList)

      localStorage.removeItem('videoList');
    }
  }

  searchVimeoVideos() {
    this.videoList = []
    this.allVideos = []
    this.getVideosFromStorage()

    this.service.searchVimeoVideos({query: 'dogs'}).subscribe( data => {
      if (data) {
        data.data.forEach( (f: any) => {
          this.videoList.push({...f, isFavorite: false})
        })
      }
      this.loadingVideos = false
      this.allVideos = this.videoList
    },error => {
      this.snackbar.openSnackBar(error.error)
    })
  }

  removeVideo(index: number) {return this.videoList.splice(index, 1)}

  setFavorite(uri: string) {
    const video = this.videoList.find( (f: { uri: string; }) => f.uri === uri)
    return video.isFavorite = !video.isFavorite;
  }

  redirectTo() {
    this.router.navigate(['dashboard/options'])
  }

  ngOnDestroy() {
    this.removeVideoSubscription.unsubscribe()
    this.setFavoriteVideoSubscription.unsubscribe()
  }
}
