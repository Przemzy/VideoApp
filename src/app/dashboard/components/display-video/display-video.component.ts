import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-display-video',
  templateUrl: './display-video.component.html',
  styleUrls: ['./display-video.component.scss']
})
export class DisplayVideoComponent implements OnInit {

  @Input() videoId: any

  video: any

  constructor( private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.videoId = this.videoId.replace('videos', 'video')
    this.video = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com' + this.videoId)
  }
}
