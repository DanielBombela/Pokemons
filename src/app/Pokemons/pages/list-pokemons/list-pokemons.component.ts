import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemons.service';
import { DetailPokemon, Pokemon } from '../../interfaces/pokemon';
import { MatDialog } from '@angular/material/dialog';
import { DetailPokemonComponent } from '../../components/detail-pokemon/detail-pokemon.component';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.component.html',
  styleUrls: ['./list-pokemons.component.scss'],
})
export class ListPokemonsComponent {
  public pokemons: Pokemon[] = [];
  public currentPage: number = 0;
  constructor(
    private _pokemonService: PokemonService,
    private dialog: MatDialog
  ) {}

  /**
   * Invocamos el metodo para cargar la data de los pokemones
   */
  ngOnInit(): void {
    this.loadPokemons();
  }

  /**
   * El metódo carga el listado de pokemones consultando un servicio a traves de la pagina actual.
   * @param currentPage Parametro de numero de pagina que queremos consultar
   */
  loadPokemons(currentPage: number = 0) {
    this._pokemonService.getPokemons(currentPage).subscribe({
      next: (response: Pokemon[]) => {
        this.pokemons = response;
      },
      error: () => {},
    });
  }

  /**
   * Metodo para cambiar de pagina
   */
  nextPage() {
    this.currentPage++;
    this.loadPokemons(this.currentPage);
  }

  /**
   * Metodo para retroceder de pagina
   */
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPokemons(this.currentPage);
    }
  }

  /**
   * Obtenemos la información del pokemon seleccionado al dar click en una card y despues invocamos el modal a mostrar con su informacion
   * @param Pokemon Objeto pokemon a consultar para su detalle
   */
  getDetailPokemon(Pokemon: Pokemon) {
    this._pokemonService.getPokemonDetail(Pokemon.id).subscribe({
      next: (detailPokemon: DetailPokemon) => {
        this.showDetailPokemon(detailPokemon);
      },
    });
  }

  /**
   *
   * @param detailPokemon Objeto detalle del pokemon a mostrar su informacion
   */
  showDetailPokemon(detailPokemon: DetailPokemon) {
    this.dialog.open(DetailPokemonComponent, {
      width: '400px',
      data: {
        detailPokemon,
      },
    });
  }
}
