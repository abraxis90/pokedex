export interface PokemonList {
  total: number;
  pokemon: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface Pokemon {
  picture: string;
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
}

export interface PokemonAbility {
  name: string;
  description: string;
}
