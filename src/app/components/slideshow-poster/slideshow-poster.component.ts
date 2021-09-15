import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/films.interface';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input("data") peliculasRecomendadas: Movie[] = [];
  slideOpts = {
    slidesPerView: 2.5,
    initialSlide: 1,
    speed: 400,
    freeMode: false
  };

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  async mostrarDetalles(id: string){
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    return await modal.present();
  }
}
