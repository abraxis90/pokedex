import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { BulkFetchResult } from './models/fetch-results';
import { combineLatest, Observable } from 'rxjs';
import { Pokemon, PokemonAbility, PokemonList } from './models/pokemon';

const POKEMON_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllPokemon(limit: number): Observable<PokemonList> {
    const allPokemonEndpoint = `${POKEMON_ENDPOINT}?limit=${limit}`;
    const allPokemonRequest = this.httpClient.get(allPokemonEndpoint) as Observable<BulkFetchResult>;

    return allPokemonRequest.pipe(
      map((result: BulkFetchResult) => {
        const pokemonTotal = result.count;
        const pokemonList = result.results.map(r => {
          return {
            name: r.name,
            url: r.url
          };
        });
        return {
          total: pokemonTotal,
          pokemon: pokemonList
        };
      })
    );
  }

  /**
   * Returns a pokemon for the provided endpoint. Weight in kgs, height in meters.
   * @param endpoint the url provided by a pokemon list item
   */
  public getPokemon(endpoint: string): Observable<Pokemon> {
    const pokemonRequest = this.httpClient.get(endpoint);
    return pokemonRequest.pipe(
      // TODO properly type result
      map((r: any) => {
        return {
          picture: r.sprites.front_default,
          name: r.name,
          height: r.height / 10,
          weight: r.weight / 10,
          abilities: r.abilities
        };
      }),
      // get abilities with effects
      switchMap(partialPokemon => {
        const abilityRequests: Observable<PokemonAbility>[] = partialPokemon.abilities.map(partial => this.getAbility(partial.ability.url));
        return combineLatest(abilityRequests)
          .pipe(
            map(responses => {
              partialPokemon.abilities = responses;
              return partialPokemon;
            })
          );
      })
    );
  }

  private getAbility(endpoint: string): Observable<PokemonAbility> {
    return this.httpClient.get(endpoint).pipe(
      map((r: any) => {
        const desc = r.effect_entries
          .find(entry => entry.language.name === 'en');

        return {
          name: r.name,
          description: desc.effect
        };
      })
    );
  }
}


