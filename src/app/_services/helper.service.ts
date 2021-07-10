import { Injectable } from '@angular/core';
import { Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private removeVideoSubject = new Subject<any>()
  private favoriteVideoSubject = new Subject<any>()

  constructor() {}

  removeVideo(item: any): void {
    this.removeVideoSubject.next(item)
  }

  getUpdatedList(): Observable<any> {
    return this.removeVideoSubject.asObservable()
  }

  setFavorite(item: any): void {
    this.favoriteVideoSubject.next(item)
  }

  getUpdatedFavorite(): Observable<any> {
    return this.favoriteVideoSubject.asObservable()
  }
}
