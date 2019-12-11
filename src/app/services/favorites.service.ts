import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { PokemonListItem } from '../models/pokemon';
import { BehaviorSubject } from 'rxjs';

const FAVORITES_KEY = 'pokemon-favorites';

export interface PokemonFavoriteFlags {
  [name: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  public pokemonFavoriteFlags$: BehaviorSubject<PokemonFavoriteFlags>;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    // init
    this.pokemonFavoriteFlags$ = new BehaviorSubject<PokemonFavoriteFlags>(this.getFavorites() || {});
  }

  public toggleFavorite(pokemonListItem: PokemonListItem) {
    const newFlags = this.updateFlags(pokemonListItem);
    this.persistFavorites(newFlags);
    this.pokemonFavoriteFlags$.next(newFlags);
  }

  private persistFavorites(flags: PokemonFavoriteFlags): void {
    return this.storage.set(FAVORITES_KEY, flags);
  }

  private getFavorites(): PokemonFavoriteFlags {
    return this.storage.get(FAVORITES_KEY);
  }

  private updateFlags(pokemonListItem: PokemonListItem) {
    const currentFlags = this.pokemonFavoriteFlags$.value;
    currentFlags[pokemonListItem.name] = pokemonListItem.isFavorited;
    return currentFlags;
  }

}
