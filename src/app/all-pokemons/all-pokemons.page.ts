import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../services/pokemon.service';
import {pokemonModel} from '../models/pokemon-model';
import {NavigationExtras, Router} from '@angular/router';


@Component({
  selector: 'app-all-pokemons',
  templateUrl: './all-pokemons.page.html',
  styleUrls: ['./all-pokemons.page.scss'],
})
export class AllPokemonsPage implements OnInit {

  pokemonList:  pokemonModel[];

  constructor(private pokemonService: PokemonService, private router: Router) {
    this.getPokemon();
  }

  getPokemon(infiniteScroll?) {
    setTimeout(() => {
      this.pokemonList = this.pokemonService.getPokemons();
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
