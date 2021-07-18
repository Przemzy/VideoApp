import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private removeVideoSubject = new Subject<any>()
  private favoriteVideoSubject = new Subject<any>()
  private menuSelection = new BehaviorSubject<any>('All videos')

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

  setMenuItem(item: any): void {
    console.log(item)
    this.menuSelection.next(item)
  }

  updateMenuItem(): Observable<any> {
    console.log(this.menuSelection);
    return this.menuSelection.asObservable()
  }
}
