import { Component, OnInit } from '@angular/core';
import { Names } from '../models/hero.model';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Names = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getElement();
  }

  getElement(): void {
    this.heroService.getNames()
        .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
