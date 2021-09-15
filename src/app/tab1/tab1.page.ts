import { Component } from '@angular/core';
import { Movie } from '../interfaces/films.interface';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  peliculasRecientes: Movie[] = [];
  peliculasPopulares: Movie[] = [];


  constructor(
    private ms: MoviesService
  ) {}

  ngOnInit(){
    this.ms.getFeature()
      .subscribe( data => this.peliculasRecientes = [...data.results]);

    this.getPopulares();
  }

  cargarMas(){
    this.getPopulares();
  }

  getPopulares(){
    this.ms.getMostPopularMovies()
      .subscribe( data => {
        const tempArray = [ ...this.peliculasPopulares, ...data.results];
        this.peliculasPopulares = tempArray;
      });
  }
}
