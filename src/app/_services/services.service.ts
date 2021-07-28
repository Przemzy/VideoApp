import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

export enum servicesUrl {
  SearchVimeoVideos = '/videos'
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  apiUrl = environment.apiUrlVimeo

  constructor(private http: HttpClient) {}

  searchVimeoVideos(search: any): Observable<any> {
    const params = new HttpParams({fromObject : {...search}});
    return this.http.get<any>(this.apiUrl + servicesUrl.SearchVimeoVideos, {params})
  }

  getVideoById(videoId: number): Observable<any> {
    const id = '/'+ videoId
    return this.http.get<any>(this.apiUrl + servicesUrl.SearchVimeoVideos + id)
  }

  getVideoByUris(videoUris: any): Observable<any> {
    const params = new HttpParams().append('uris', videoUris);
    return this.http.get<any>(this.apiUrl + servicesUrl.SearchVimeoVideos, {params})
  }
}
