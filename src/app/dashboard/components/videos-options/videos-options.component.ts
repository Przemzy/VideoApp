import {Component, OnInit} from '@angular/core';
import {ServicesService} from "../../../_services/services.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SnackbarComponent} from "../../../shared/components/snackbar/snackbar.component";
import {Router} from "@angular/router";
import {VideoModel} from "../../../models/videoModel";

@Component({
  selector: 'app-videos-options',
  templateUrl: './videos-options.component.html',
  styleUrls: ['./videos-options.component.scss'],
  providers: [SnackbarComponent]
})
export class VideosOptionsComponent implements OnInit {

  videoInformation: any

  searchVideoForm: FormGroup
  getMultiplyVideos: FormGroup

  loading = false
  loadingUris = false
  lockButtons = false

  videoList: VideoModel[]
  videoUrisList: string[] = [
    '/videos/568430412',
    '/videos/568018248',
    '/videos/459168381'
  ]

  constructor(private services: ServicesService,
              private snackbar: SnackbarComponent,
              private router: Router) {
    this.searchVideoForm = new FormGroup({
      videoId: new FormControl('478504402', [Validators.required, Validators.pattern("[0-9]+")])
      })

    this.getMultiplyVideos = new FormGroup({
      videoUri: new FormControl('/videos/339613023', [Validators.required])
      })
  }

  ngOnInit(): void {}

  goToDashboard() {return this.router.navigate(['/dashboard'])}

  addToVideoList(item:any) {
    this.snackbar.openSnackBar('Video added to list 👍')
    localStorage.newVideo = JSON.stringify(item)
    this.videoInformation = null
  }

  addVideosToList() {
    if (this.videoList) {
      localStorage.videoList = JSON.stringify(this.videoList)
      this.snackbar.openSnackBar('New videos have been added to list 👌')
      this.videoList.length = 0
    }
  }

  pushVideoUriToList() {
    const videoUri = this.getMultiplyVideos.get('videoUri')?.value
    if (videoUri) {
      this.videoUrisList.push(videoUri)
      this.getMultiplyVideos.get('videoUri')?.setValue('')
    }
  }

  getErrorMessage() {
   return this.searchVideoForm.get('videoId')?.hasError('pattern')
     ? 'Only numbers'
     : 'This field is required'
  }

  openBlank(item: string) {
    const videoId = item.replace('/videos/', '')
    return window.open('https://vimeo.com/' + videoId, '_blank')
  }

  getVideoById() {
    if (this.searchVideoForm.valid) {

      this.loading = true
      this.lockButtons = true
      this.videoInformation = null

      this.services.getVideoById(this.searchVideoForm.get('videoId')?.value).subscribe(data => {
        if (data) {
          this.videoInformation = {
            name: data.name,
            img: data.pictures.sizes[1].link,
            isFavorite: false,
            likes: data.metadata.connections.likes.total,
            plays: data.stats.plays == null ? 0 : data.item.stats.plays,
            releaseTime: data.release_time,
            uri: data.uri
          }
        }
        this.loading = false
        this.lockButtons = false

      }, error => {

        this.snackbar.openSnackBar(error.error)
        this.loading = false
        this.lockButtons = false
      })
    }
    console.log(this.videoList)
  }

  getVideosByUris() {
    if (this.videoUrisList) {
      this.loadingUris = true
      this.lockButtons = true

      this.services.getVideoByUris(this.videoUrisList).subscribe( data => {
        this.videoList = []
        if (data) {
          data.data.forEach( (f: any) => {
            this.videoList.push({
              name: f.name,
              img: f.pictures.sizes[2].link,
              isFavorite: false,
              likes: f.metadata.connections.likes.total,
              plays: f.stats.plays == null ? 0 : data.item.stats.plays,
              releaseTime: f.release_time,
              uri: f.uri,
              description: f.description
            })
          })
        }
        this.loadingUris = false
        this.lockButtons = false

      }, error => {
        this.snackbar.openSnackBar(error.error)
        this.loadingUris = false
        this.lockButtons = false
      })
    }
  }
}
