import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { MovieDetail } from '../interfaces/films.interface';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculasFavoritas: MovieDetail[];

  constructor() {}

  async guardarPelicula(pelicula?: MovieDetail){
    if( pelicula ){
      await this.verificarDuplicidad(pelicula);
    }
    await Storage.set({
      key: 'favoritos',
      value: JSON.stringify(this.peliculasFavoritas),
    });
    return 'Agregado a favoritos';
  }

  async obtenerPeliculas(){
    const { value } = await Storage.get({ key: 'favoritos' });
    if(value !== null){
      this.peliculasFavoritas = JSON.parse(value! );
    }else{
      this.peliculasFavoritas = [];
    }
    return [...this.peliculasFavoritas];
  }

  async verificarDuplicidad(pelicula: MovieDetail){
    const esFavorito = await this.esFavorito(pelicula.id);
    if( !esFavorito ){
      this.peliculasFavoritas.push(pelicula);
    }
  }

  async eliminarPelicula(pelicula: MovieDetail){
    this.peliculasFavoritas = this.peliculasFavoritas.filter(movie =>  movie.id !== pelicula.id);
    await this.guardarPelicula();
    return 'Eliminado de favoritos';
  }

  async esFavorito( idPelicula: number ){
    if( !this.peliculasFavoritas ){ await this.obtenerPeliculas(); }
    return this.peliculasFavoritas.find( movie => movie.id === idPelicula ) ? true : false;
  }
}
