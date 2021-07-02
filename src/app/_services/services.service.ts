import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchVideosModel} from "../models/searchVideosModel";
import {ytSearchModel} from "../models/ytSearchModel";

export enum servicesUrl {
  SearchVideo = '/search',
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private url = 'https://www.googleapis.com/youtube/v3';
  private apiKey = '';

  constructor(private http: HttpClient) {}



  // getVideo(): Observable<YouTubeModel> {
  //   return this.http.get<YouTubeModel>(this.url + '')
  // }

  searchVideos(search: SearchVideosModel): Observable<ytSearchModel> {
    const params = new HttpParams({
      fromObject : {
        ...search,
        'key': this.apiKey
      }
    });
    return this.http.get<ytSearchModel>(this.url + servicesUrl.SearchVideo, {params})
  }

  // getVedeoInfoById(videoId: string): Observable<ytSearchModel> {
  //   // const params = new HttpParams({
  //   //   fromObject: {
  //   //     'videoId': videoId,
  //   //   }
  //   // });
  //   return this.http.get<ytSearchModel>(this.iFrameUrl +  videoId + '?enablejsapi=1')
  // }


}
