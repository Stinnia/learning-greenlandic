import { Component, OnInit } from '@angular/core';
import { DictionaryService } from '../dictionary.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dictionary-search',
  templateUrl: './dictionary-search.component.html',
  styleUrls: ['./dictionary-search.component.css']
})
export class DictionarySearchComponent implements OnInit {
  dictionary$: Observable<any[]>;
  startAt: BehaviorSubject<string | null> = new BehaviorSubject('');

  constructor(private dictionarySvc: DictionaryService) {}

  ngOnInit() {
    this.dictionary$ = this.dictionarySvc.getDictionary(this.startAt);
  }

  search(searchText) {
    this.startAt.next(searchText);
  }
}
