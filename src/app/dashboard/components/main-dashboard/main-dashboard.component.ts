import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServicesService} from "../../../_services/services.service";
import {DisplayOptionsEnum} from "../../../models/enums/displayOptionsEnum";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {HelperService} from "../../../_services/helper.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {SnackbarComponent} from "../../../shared/components/snackbar/snackbar.component";
import {VideoModel} from "../../../models/videoModel";


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

  videoList: VideoModel[]
  allVideos: VideoModel[]

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
    this.searchVimeoVideos();
  }

  handleChange(event: string) {
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
    list.sort(function (a: { releaseTime: Date; }, b: { releaseTime: Date; }) {
      return new Date(a.releaseTime).getTime() - new Date(b.releaseTime).getTime();
    })
  }

  setNewestVideos(list: any) {
    list.sort(function (a: { releaseTime: Date; }, b: { releaseTime: Date; }) {
      return new Date(b.releaseTime).getTime() - new Date(a.releaseTime).getTime();
    })
  }

  setFavoritesVideos() {
    this.videoList = this.videoList.filter((f: { isFavorite: boolean; }) => f.isFavorite);
    this.selectedChips = 'Favorites'
  }

  openModal(item: VideoModel) {
    this.dialog.open(ModalComponent, {data: {...item}})
  }

  getVideosFromStorage() {
    if ('newVideo' in localStorage) {
      const newVideo = JSON.parse(localStorage.newVideo)
      this.videoList.push({...newVideo})
      this.allVideos.push({...newVideo})

      localStorage.removeItem('newVideo');
    }

    if ('videoList' in localStorage) {
      this.allVideos = Array.from(JSON.parse(localStorage.videoList));
      this.videoList = Array.from(JSON.parse(localStorage.videoList));

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
          this.videoList.push({
            name: f.name,
            img: f.pictures.sizes[2].link,
            isFavorite: false,
            likes: f.metadata.connections.likes.total,
            plays: f.stats.plays == null ? 0 : f.item.stats.plays,
            releaseTime: f.release_time,
            uri: f.uri,
            description: f.description
          })
        })
      }
      this.loadingVideos = false
      this.allVideos = this.videoList
    },error => {
      this.snackbar.openSnackBar(error.error)
      this.loadingVideos = false
    })
  }

  removeVideo(index: number) {return this.videoList.splice(index, 1)}

  setFavorite(uri: string) {
    const video = this.videoList.find( (f: { uri: string; }) => f.uri === uri)
    if (video) {
      return video.isFavorite = !video.isFavorite;
    }
    return
  }

  redirectTo() {
    this.router.navigate(['dashboard/options'])
  }

  ngOnDestroy() {
    this.removeVideoSubscription.unsubscribe()
    this.setFavoriteVideoSubscription.unsubscribe()
  }
}
