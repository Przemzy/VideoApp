import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {VideoSizesEnum} from "../../../models/enums/videoSizesEnum";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent{

  videoId: string;
  videoTitle: string

  videoSizes = VideoSizesEnum


  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
    console.log(data)
    this.videoId = data.id.videoId;
    this.videoTitle = data.snippet.title;
  }

}
