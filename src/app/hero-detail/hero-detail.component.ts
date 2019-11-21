import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../models/hero.model';
import { HeroService }  from '../services/hero.service';
import {Observable, Subscriber} from "rxjs";


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input()
  hero: Hero[];

  id: number;

  heroes$: Observable<Hero[]>;

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
      this.heroService.getHero(this.id)
          .subscribe(hero => this.hero = hero);
    } else {
      this.heroService.getHeroes()
          .subscribe(hero => this.hero = hero);
    }
  }

  onGoBack(): void {
    this.location.back();
  }

  onSave(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.onGoBack());
  }

  onReplaceAll() {
   this.hero.map(a => ({ ...a, status:"online"}));
       this.heroService.updateAllElements(this.hero)
         .subscribe(() => this.onGoBack());
  }
}

