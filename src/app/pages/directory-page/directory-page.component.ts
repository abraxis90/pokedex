import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { Pokemon, PokemonList, PokemonListItem } from '../../models/pokemon';
import { UserSettingsService } from '../../services/user-settings.service';
import { FavoritesService, PokemonFavoriteFlags } from '../../services/favorites.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-directory-page',
  templateUrl: './directory-page.component.html',
  styleUrls: ['./directory-page.component.scss']
})
export class DirectoryPageComponent implements OnInit {

  public pokemonList$: Observable<PokemonList>;
  public selectedPokemon$: Subject<Pokemon> = new Subject<Pokemon>();

  constructor(private apiService: ApiService,
              private userSettingsService: UserSettingsService,
              private favoritesService: FavoritesService) {
  }

  ngOnInit() {

    this.pokemonList$ = combineLatest([
      this.apiService.getAllPokemon(this.userSettingsService.pageSize$.value),
      this.favoritesService.pokemonFavoriteFlags$
    ])
      .pipe(
        map(
          ([pokemonList, favoriteFlags]) => {
            return this.mergePokemonListWithFlags(pokemonList, favoriteFlags);
          }
        )
      );

  }

  selectPokemon(url: string) {
    this.apiService.getPokemon(url)
      .subscribe((pokemon: Pokemon) => {
        this.selectedPokemon$.next(pokemon);
      });
  }

  toggleFavoritePokemon(pokemonListItem: PokemonListItem) {
    const newListItem = Object.assign({}, pokemonListItem, {isFavorited: !pokemonListItem.isFavorited});
    this.favoritesService.toggleFavorite(newListItem);
  }

  private mergePokemonListWithFlags(pokemonList: PokemonList, favFlags: PokemonFavoriteFlags): PokemonList {
    const pokemonWithFavs = pokemonList.pokemon.map(
      listItem => {
        return Object.assign({}, listItem, {isFavorited: favFlags[listItem.name]});
      });

    return Object.assign({}, pokemonList, {pokemon: pokemonWithFavs});
  }

}
