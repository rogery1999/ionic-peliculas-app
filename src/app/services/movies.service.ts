import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { CreditsResponse, GenresResponse, MovieDetail, ResponseAPI } from '../interfaces/films.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  api: string = environment.api;
  api_key: string = environment.api_key;
  private popularesPage: number = 0;

  private get languageConfiguration() : HttpParams {
    return new HttpParams()
      .set("language", "es")
      .set("include_image_language", "es")
      .set("api_key", this.api_key);
  }
  private get intevalDates(): {inicio: string, fin: string} {
    const hoy  = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString: string;
    if( mes < 10){ mesString = `0${hoy.getMonth() + 1}` }
    else{ mesString = `${hoy.getMonth() + 1}`; }

    const inicio = `${hoy.getFullYear()}-01-01`,//`${hoy.getFullYear()}-${mesString}-${hoy.getDate()}`,
          fin    = `${hoy.getFullYear()}-01-31`;//`${hoy.getFullYear()}-${mesString}-${ultimoDia}`;
    return {inicio, fin};
  }
  private get discoverRequest() : string {
    return `${this.api}/discover`
  }

  constructor(
    private http: HttpClient
  ) { }

  getFeature(): Observable<ResponseAPI> {
    const { inicio, fin } = this.intevalDates;
    const params = this.languageConfiguration
                    .set("primary_release_date.gte", inicio)
                    .set("primary_release_date.lte", fin);
    return this.http.get<ResponseAPI>(`${this.discoverRequest}/movie`, { params });
  }

  getMostPopularMovies(): Observable<ResponseAPI> {
    this.popularesPage++;
    const params = this.languageConfiguration
                    .set("region", "PE")
                    .set("sort_by", "popularity.desc")
                    .set("page", this.popularesPage.toString());
    return this.http.get<ResponseAPI>(`${this.discoverRequest}/movie`, { params });
  }

  getMovieById(id: string){
    const params = this.languageConfiguration;
    return this.http.get<MovieDetail>(`${this.api}/movie/${id}`, { params });
  }

  getCredits(id: string){
    const params = new HttpParams().set("api_key", this.api_key);
    return this.http.get<CreditsResponse>(`${this.api}/movie/${id}/credits`, { params });
  }

  searchMovie(query: string){
    const params = this.languageConfiguration.set("query", query);
    return this.http.get<ResponseAPI>(`${this.api}/search/movie`, { params }).pipe( delay(2000) );
  }

  getGenres(){
    const params = this.languageConfiguration;
    return this.http.get<GenresResponse>(`${this.api}/genre/movie/list`, { params });
  }
}
