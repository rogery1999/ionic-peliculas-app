import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { CreditsResponse, MovieDetail, Cast } from '../../interfaces/films.interface';
import { ModalController, ToastController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id: string;
  movie: MovieDetail;
  credits: CreditsResponse;
  cast: Cast[] = [];
  oculto = 150;
  slideOptActores = {
    slidesPerView: 2.5,
    freeMode: true,
    spacebetween: -5
  }
  isFavourite = false;

  constructor(
    private movieService: MoviesService,
    private modalController: ModalController,
    private ds: DataLocalService,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    this.isFavourite = await this.ds.esFavorito(parseInt(this.id));

    this.movieService.getMovieById(this.id)
      .subscribe((data) => { this.movie = data; });

    this.movieService.getCredits(this.id)
      .subscribe((data) => {
        this.credits = data;
        this.cast = data.cast;
      });
  }

  dissmis(){
    this.modalController.dismiss();
  }

  async favorito(){
    this.isFavourite = !this.isFavourite;
    const message = this.isFavourite
      ? await this.ds.guardarPelicula(this.movie)
      : await this.ds.eliminarPelicula( this.movie );
    const toast = await this.toastController.create({
      message,
      position: 'bottom',
      duration: 2000
    });
    await toast.present();
  }

}
