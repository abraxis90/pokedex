import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ApiService } from '../api.service';
import { Pokemon, PokemonList } from '../models/pokemon';
import { UserSettingsService } from '../user-settings.service';

@Component({
  selector: 'app-directory-page',
  templateUrl: './directory-page.component.html',
  styleUrls: ['./directory-page.component.scss']
})
export class DirectoryPageComponent implements OnInit {

  public pokemonList$: Observable<PokemonList>;
  public selectedPokemon$: Subject<Pokemon> = new Subject<Pokemon>();

  constructor(private apiService: ApiService, private userSettingsService: UserSettingsService) {
  }

  ngOnInit() {
    this.pokemonList$ = this.apiService.getAllPokemon(this.userSettingsService.pageSize$.value);
  }

  selectPokemon(url: string) {
    this.apiService.getPokemon(url)
      .subscribe((pokemon: Pokemon) => {
        this.selectedPokemon$.next(pokemon);
      });
  }

}
