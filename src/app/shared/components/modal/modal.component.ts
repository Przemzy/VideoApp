import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HelperService} from "../../../_services/helper.service";
import {VideoModel} from "../../../models/videoModel";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent{

  constructor(@Inject(MAT_DIALOG_DATA,) public data:VideoModel,
              private helperService: HelperService) {
  }

  removeVideo() {
    this.helperService.removeVideo(this.data.uri)
  }

  setFavorite() {
    this.data.isFavorite = !this.data.isFavorite;
    this.helperService.setFavorite(this.data.uri);
  }
}
