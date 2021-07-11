import {Component, OnInit} from '@angular/core';
import {ServicesService} from "../../../_services/services.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SnackbarComponent} from "../../../shared/components/snackbar/snackbar.component";
import {Router} from "@angular/router";

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

  videoList: any
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

  ngOnInit(): void {
  }

  goToDashboard() {return this.router.navigate(['/dashboard'])}

  deleteAllVideos() {
    this.snackbar.openSnackBar('Your video list is empty!')
    localStorage.deleteAllVideos = true;
  }

  addToVideoList(item:any) {
    this.snackbar.openSnackBar('Video added to list 👍')
    localStorage.newVideo = JSON.stringify(item)
    this.videoInformation = null
  }

  addVideosToList() {
    if (this.videoList) {
      localStorage.videoList = JSON.stringify(this.videoList)
      this.snackbar.openSnackBar('New videos was added to list 👌')
      this.videoList = null
    }
  }

  pushVideoUriToList() {
    this.videoUrisList.push(this.getMultiplyVideos.get('videoUri')?.value)
    this.getMultiplyVideos.get('videoUri')?.setValue('')
    console.log(this.videoList)
  }

  getErrorMessage() {
   return this.searchVideoForm.get('videoId')?.hasError('pattern') ? 'Only numbers' : ''
  }

  getVideoById() {
    if (this.searchVideoForm.valid) {

      this.loading = true
      this.lockButtons = true
      this.videoInformation = null

      this.services.getVideoById(this.searchVideoForm.get('videoId')?.value).subscribe(data => {
        if (data) {
          this.videoInformation = data
        }

        this.loading = false
        this.lockButtons = false

      }, error => {

        this.snackbar.openSnackBar(error.error)
        this.loading = false
        this.lockButtons = false

      })
    }
  }

  getVideosByUris() {
    if (this.videoUrisList) {
      this.loadingUris = true
      this.lockButtons = true

      this.services.getVideoByUris(this.videoUrisList).subscribe( data => {
        if (data) {
          this.videoList = Array.from(data.data)
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
