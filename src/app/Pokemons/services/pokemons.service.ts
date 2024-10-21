import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  DetailPokemon,
  DetailResponsePokemon,
  Pokemon,
} from '../interfaces/pokemon';
import { PokemonApiResponse } from '../interfaces/pokemon-response';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly _pageSize = 20;
  private readonly _baseUrl: string = environment.baseUrl;
  constructor(private _http: HttpClient) {}

  /**
   * Metodo que hace la peticion http a la api para consultar la informacion de los pokemones
   * @param page
   * @returns  nos retorna un arreglo de objetos de pokemones que consultamos a la api
   */
  public getPokemons(page: number): Observable<Pokemon[]> {
    //Creamos los parametros a enviar a la peticion, como el offset y limit
    let params = new HttpParams();
    params = params.append('offset', page * this._pageSize);
    params = params.append('limit', this._pageSize);

    if (page != 0) --page;
    page = Math.max(0, page);

    //Mapeamos la respuesta para obtener solamente la data necesaria de los pokemones, extrayendo asi mismo su id
    return this._http.get<PokemonApiResponse>(this._baseUrl, { params }).pipe(
      map((response) => {
        const Pokemons: Pokemon[] = response.results.map((pokemon) => ({
          id: pokemon.url.split('/').at(-2) ?? '',
          name: pokemon.name,
        }));
        return Pokemons;
      })
    );
  }

  /**
   * Metodo para obtener la informacion a detalle del pokemon a consultar
   * @param idPokemon solicitamos el id del pokemon a consultar
   * @returns 
   */
  public getPokemonDetail(idPokemon: string): Observable<DetailPokemon> {
    //Mapeamos la respuesta para obtener solamente la data necesaria de los pokemones, extrayendo asi mismo su id
    return this._http
      .get<DetailResponsePokemon>(`${this._baseUrl}/${idPokemon}/`)
      .pipe(
        map((response) => {
          const detailPokemon: DetailPokemon = {
            name: response.name,
            types: response.types,
            stats: response.stats,
            sprites: response.sprites,
          };
          return detailPokemon;
        })
      );
  }
}
