import { Injectable } from '@angular/core';
import {pokemonModel} from '../models/pokemon-model';
import {HttpClient} from '@angular/common/http';
import {DataStorage} from '../storage/DataStorage';
import {ShareService} from './share.service';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url = 'https://pokeapi.co/api/v2/pokemon-species';
  private pokemonList: pokemonModel [];
  private myPokemonList: pokemonModel[];

  constructor(private http: HttpClient, private storage: DataStorage, private share: ShareService) {
    this.pokemonList = [];
    this.myPokemonList = [];
    this.getPokemons();
  }

  public getMyPokemon() {
    this.storage.getPokemonNames().then(value => {
      value.forEach(name => {
        let pokemon: pokemonModel;
           pokemon = this.getPokemon(name);
           this.myPokemonList.push(pokemon);
      });
    });
    return this.myPokemonList;
  }

  public getPokemons() {
    const names = [];
    let name;
    this.http.get(this.url).subscribe((res: any) => {
      this.url = res.next;
      res.results.forEach(item => {
        name = item.name;
        names.push(name);
      });

    names.forEach(name => {
            let pokemon: pokemonModel;
            pokemon = this.getPokemon(name);
            this.pokemonList.push(pokemon);
          });
    });
    return this.pokemonList;
  }

  getRandomPokemon() {
    const rPokemon = this.pokemonList[Math.floor(Math.random() * this.pokemonList.length)];
    return rPokemon;
  }

  public getPokemon(name: string): pokemonModel {
    const pokemon = new pokemonModel();

    this.http.get('https://pokeapi.co/api/v2/pokemon/' + name).subscribe((res: any) => {
      pokemon.name = res.species.name;
      pokemon.sprite = res.sprites.front_default;
      pokemon.height = res.height;
      pokemon.weight = res.weight;
      pokemon.types = [];

      res.types.forEach(type => {
        pokemon.types.push(type.type.name);
      });

    });

    return pokemon;
  }

  public catchPokemon(name: string) {
      this.storage.save(name);
  }
  public sharePokemon(name) {
    this.share.share(name);
  }
}
