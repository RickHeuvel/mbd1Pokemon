import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../services/pokemon.service';
import {Router} from '@angular/router';
import {pokemonModel} from '../models/pokemon-model';

@Component({
  selector: 'app-my-pokemons',
  templateUrl: './my-pokemons.page.html',
  styleUrls: ['./my-pokemons.page.scss'],
})
export class MyPokemonsPage implements OnInit {
  private pokemonList: pokemonModel[];

  constructor(private pokemonService: PokemonService, private router: Router) {
    this.getPokemon();
  }

  getPokemon(infiniteScroll?) {
    setTimeout(() => {
      this.pokemonList = this.pokemonService.getMyPokemon();
      if (infiniteScroll) {
        infiniteScroll.target.complete();
      }
    }, 1000);
  }

  goToPokemon(name: string) {
    this.router.navigate(['pokemon/' + name] );
  }
  getMorePokemon(infiniteScroll) {
    this.getPokemon(infiniteScroll);
  }
  ngOnInit() {
  }

}
