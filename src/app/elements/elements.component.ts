import { Component, OnInit } from '@angular/core';

import { Hero } from '../models/hero.model';
import { HeroService } from '../services/hero.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService, public router: Router) { }

  ngOnInit() {
    this.getElement();
  }

  getElement(): void {
    this.heroService.getElements()
        .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  onAdd(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  onDelete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  onDeleteAll(): void {
    this.heroes = [];
  }

  onEdit(hero: Hero) {
    this.router.navigate(['/detail/', hero.id]);
  }

  onEditAll(hero: Hero): void {
    this.router.navigate(['/detail/all']);
  }

}

