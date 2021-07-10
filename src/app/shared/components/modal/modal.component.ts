import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {VideoSizesEnum} from "../../../models/enums/videoSizesEnum";
import {HelperService} from "../../../_services/helper.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent{

  videoSizes = VideoSizesEnum

  constructor(@Inject(MAT_DIALOG_DATA,) public data:any,
              private helperService: HelperService) {
  }

  removeVideo() {
    this.helperService.removeVideo(this.data.name)
  }

  setFavorite() {
    this.data.isFavorite = !this.data.isFavorite;
    this.helperService.setFavorite(this.data.name);
  }
}
