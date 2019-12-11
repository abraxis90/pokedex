import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FavoritesService, PokemonFavoriteFlags } from './services/favorites.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public favoritePokemonCount$: Observable<number>;

  constructor(private favoritesService: FavoritesService) {
    this.favoritePokemonCount$ = this.favoritesService.pokemonFavoriteFlags$
      .pipe(
        map(
          (flags) => {
            return this.countAllFavorites(flags);
          }
        )
      );
  }

  private countAllFavorites(flags: PokemonFavoriteFlags): number {
    const flagVals = Object.values(flags);
    return flagVals.reduce((prev, curr) => prev + (curr ? 1 : 0), 0);
  }

}
