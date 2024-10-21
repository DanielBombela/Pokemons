import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { PokemonsRoutingModule } from './pokemons-routing.module';
import { ListPokemonsComponent } from './pages/list-pokemons/list-pokemons.component';
import { CardPokemonComponent } from './components/card-pokemon/card-pokemon.component';
import { DetailPokemonComponent } from './components/detail-pokemon/detail-pokemon.component';


@NgModule({
  declarations: [
    ListPokemonsComponent,
    CardPokemonComponent,
    DetailPokemonComponent
  ],
  imports: [
    CommonModule,
    PokemonsRoutingModule,
    MatDialogModule
  ]
})
export class PokemonsModule { }
