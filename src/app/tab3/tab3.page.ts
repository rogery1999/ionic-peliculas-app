import { Component, ViewChild } from '@angular/core';
import { MovieDetail, Genre, MoviesByGenre } from '../interfaces/films.interface';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild('content') content: IonContent;
  peliculas: MovieDetail[] = [];
  generos: Genre[];
  peliculasAgrupadasPorGenero: MoviesByGenre[];

  constructor(
    private ds: DataLocalService,
    private ms: MoviesService
  ) {}

  async ionViewWillEnter(){
    this.peliculas = await this.ds.obtenerPeliculas();
    this.ms.getGenres()
      .subscribe( response => {
        this.generos = response.genres;
        this.peliculasPorGenero();
      });
    this.content.scrollToTop(500);
  }

  peliculasPorGenero(){
    const moviesByGenre = {};
    this.generos.forEach( ({id, name}) => moviesByGenre[id] = { name, movies: [] } );
    this.peliculas.forEach( (movie) => movie.genres.forEach( ({id}) => moviesByGenre[id].movies.push({...movie})  ));
    this.peliculasAgrupadasPorGenero = Object.keys(moviesByGenre)
      .map( id => ({id: parseInt(id), name: moviesByGenre[id].name, movies: [...moviesByGenre[id].movies] }));
  }
}
