import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from './+state/reducers';
import * as heroesSelectors from './+state/selectors';
import * as heroesActions from './+state/actions';
import { Hero } from './models/hero.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  header = 'Header';
  footer = 'Footer';
  loading$: Observable<boolean>;
  heroes$: Observable<Hero[]>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.loading$ = this.store.select(heroesSelectors.FEATURE.isHeroesLoading);
    this.store.dispatch(new heroesActions.FEATURE.LoadAction());
    this.heroes$ = this.store.select(heroesSelectors.FEATURE.selectHeroes);

    this.heroes$.subscribe(data => {console.log(data)});
  }
}
