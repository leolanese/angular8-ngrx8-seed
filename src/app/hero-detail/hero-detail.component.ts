import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Name, Names } from '../models/hero.model';
import { HeroService }  from '../services/hero.service';
import {Observable, Subscription} from "rxjs";


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {

  @Input()
  hero: Subscription;

  @Input()
  heroes: Names;

  id: number;

  heroes$: Observable<Names>;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (Number.isInteger(this.id)) {
      this.hero = this.heroService.getHero(this.id)
          .subscribe(hero => this.hero = hero);
    } else {
      this.heroService.getNames()
          .subscribe(hero => this.heroes = hero);
    }
  }

  onGoBack(): void {
    this.location.back();
  }

  onSave(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.onGoBack());
  }

  onReplaceAll(): void {
   [...this.hero].map(a => ({ ...a, status:"online"}));
       this.heroService.updateAllElements(this.hero)
         .subscribe(() => this.onGoBack());
  }
}

