import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Name, Names } from '../models/hero.model';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Name> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Name>(url).pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Name>(`getHero id=${id}`))
    );
  }


  /** GET elements from the server */
  getElements(): Observable<Names> {
    return this.http.get<Names>(this.heroesUrl)
        .pipe(
            tap(data => console.log('fetched getElements', data)),
            catchError(this.handleError('getElements', []))
        );
  }


  getNames(): Observable<Names> {
    return this.http.get<Names>(this.heroesUrl)
      .pipe(
        tap(data => console.log('fetched getNames', data)),
        catchError(this.handleError('getNames', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Name> {
    const url = `${this.heroesUrl}/?id=${id}`;

    return this.http.get<Names>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Name>(`getHero id=${id}`))
      );
  }


  /* GET elements whose name contains search term */
  searchHeroes(term: string): Observable<Names> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Names>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Names>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Name): Observable<Name> {
    return this.http.post<Name>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Name) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Name>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Name | number): Observable<Name> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Name>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Name>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Name): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }


  updateAllElements(hero: Names): Observable<Name> {

    // TODO:
    // const reformattedArray = [...hero].map((obj) => {
    //   const rObj = {};
    //   rObj[obj.name] = obj.value;
    //   return rObj;
    // });
    //
    // console.log(reformattedArray);
    //
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
        catchError(this.handleError<any>('updateHero'))
    );


  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}

