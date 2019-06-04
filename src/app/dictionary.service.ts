import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  constructor(private db: AngularFireDatabase) {}
  getDictionary(start: BehaviorSubject<string>): Observable<any[]> {
    return start.pipe(
      switchMap(startText => {
        const endText = startText + '\uf8ff';
        return this.db
          .list('/dictionary', ref =>
            ref
              .orderByChild('en')
              .limitToFirst(1)
              .startAt(startText)
              .endAt(endText)
          )
          .snapshotChanges()
          .pipe(
            debounceTime(800),
            distinctUntilChanged(),
            map(changes => {
              return changes.map(c => {
                return { key: c.payload.key, ...c.payload.val() };
              });
            })
          );
      })
    );
  }
}