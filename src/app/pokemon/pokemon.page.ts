import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonService} from '../services/pokemon.service';
import {pokemonModel} from '../models/pokemon-model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {

  pokemon: pokemonModel;

  constructor(private activatedRoute: ActivatedRoute, private pokemonService: PokemonService) {
  }


  ngOnInit() {
     this.pokemon = this.pokemonService.getPokemon(this.activatedRoute.snapshot.paramMap.get('name'));

  }
    sharePokemon() {
        this.pokemonService.sharePokemon(this.pokemon.name);
    }
}
