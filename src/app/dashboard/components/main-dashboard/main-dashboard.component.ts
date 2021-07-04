import {Component, OnInit} from '@angular/core';
import {ServicesService} from "../../../_services/services.service";
import {SearchVideosModel} from "../../../models/searchVideosModel";
import {DisplayOptionsEnum} from "../../../models/enums/displayOptionsEnum";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {VideoSizesEnum} from "../../../models/enums/videoSizesEnum";


@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  videoList: any
  display = DisplayOptionsEnum
  videoSize = VideoSizesEnum
  displayOptions = this.display.blocks



  constructor( private service: ServicesService,
               private dialog: MatDialog) {
  }



  ngOnInit(): void {
    this.loadPlaceholder()
  }

  loadPlaceholder() {
    this.videoList = [];
    const number = [1,2,3,4,5,6,7,8,9,10,11]
    // const number = [1]

    number.forEach( f => {
      this.videoList.push({
        displaySize: 'small',
        etag: 'etag',
        id: {
          kind: 'kind',
          videoId: 'qj_AZ_FkPtQ'
        },
        kind: 'kind',
        snippet: 'snippet'
      })
    })
  }

  searchVideos() {
    this.videoList = [];

    const searchVideo: SearchVideosModel = {
      part: 'snippet',
      q: 'abc'
    }
    this.service.searchVideos(searchVideo).subscribe( data => {
      if (data) {
        this.videoList = Array.from(data.items);
      }
    console.log(this.videoList)
    })
  }


  openModal(item: string) {
   this.dialog.open(ModalComponent, {
      data: item
    }) ;

  }

}
