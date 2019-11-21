import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Names } from '../models/hero.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroesNoID = [
      { "name": "Ras Berry" },
      { "name": "John Doe" },
      { "name": "Gareth Aldridge" },
      { "name": "Hallen Pipper" },
      { "name": "Joe Allen" },
      { "name": "Dolly Johnson" }
    ];
    const heroes = heroesNoID.map((o,i) => Object.assign(o,{id: i + 1 } ));
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the elements array is empty,
  // the method below returns the initial number (11).
  // if the elements array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Names): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}


