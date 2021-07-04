import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {VideoSizesEnum} from "../../../models/enums/videoSizesEnum";

@Component({
  selector: 'app-display-video',
  templateUrl: './display-video.component.html',
  styleUrls: ['./display-video.component.scss']
})
export class DisplayVideoComponent implements OnInit {

  @Input() videoId: any
  @Input() size: any

  apiLoaded = false
  videoSizes = VideoSizesEnum


  link = 'https://player.vimeo.com/video/'
  video: any

  constructor( private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    // console.log(this.size);
    // this.link = this.link + '569478561';
    // console.log(this.link)
    // this.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.link)
      if (!this.apiLoaded) {
        const tag = document.createElement('script');
        tag.accessKey;
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
        this.apiLoaded = true;
      }
  }



}
