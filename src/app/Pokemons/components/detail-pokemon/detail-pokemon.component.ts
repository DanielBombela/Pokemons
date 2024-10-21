import { Component, Inject } from '@angular/core';
import { DetailPokemon } from '../../interfaces/pokemon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss'],
})
export class DetailPokemonComponent {
  public detailPokemon!: DetailPokemon;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.detailPokemon = this.data.detailPokemon;
  }

  get imagePokemon() {
    return this.detailPokemon.sprites?.front_default ?? 'assets/noImage.jpg';
  }
}
