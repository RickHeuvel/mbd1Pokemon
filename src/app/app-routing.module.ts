import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'my-pokemons', loadChildren: './my-pokemons/my-pokemons.module#MyPokemonsPageModule' },
  { path: 'all-pokemons', loadChildren: './all-pokemons/all-pokemons.module#AllPokemonsPageModule' },
  { path: 'pokemon/:name', loadChildren: './pokemon/pokemon.module#PokemonPageModule' },
  { path: 'catch/:name', loadChildren: './catch/catch.module#CatchPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
