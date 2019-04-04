import { Component, OnInit } from '@angular/core';
import {pokemonModel} from '../models/pokemon-model';
import {PokemonService} from '../services/pokemon.service';
import {ActivatedRoute} from '@angular/router';
import {Vibration} from '@ionic-native/vibration/ngx';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';


@Component({
  selector: 'app-catch',
  templateUrl: './catch.page.html',
  styleUrls: ['./catch.page.scss'],
})
export class CatchPage implements OnInit {

  pokemon: pokemonModel;
  timerVar;
  timerVal;
  catchTime;

  caught = false;

  constructor(private activatedRoute: ActivatedRoute, private pokemonService: PokemonService, private vibration: Vibration) {
    this.catchTime = 20;
    this.startTimer();
  }

  catch() {
        this.vibration.vibrate(1000);
        if (this.timerVal < this.catchTime) {
          this.pokemonService.catchPokemon(this.pokemon.name);
          this.timerVar.unsubscribe();
          this.caught = true;
        } else {
          this.timerVar.unsubscribe();
          console.log('telaat');
        }
  }

  startTimer() {
    this.timerVar = Observable.interval(1000).subscribe( x => {
      this.timerVal = x;
      console.log(this.timerVal);
    });
  }

  ngOnInit() {
    this.pokemon = this.pokemonService.getPokemon(this.activatedRoute.snapshot.paramMap.get('name'));

  }

}
