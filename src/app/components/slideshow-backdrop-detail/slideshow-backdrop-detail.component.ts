import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MovieDetail } from '../../interfaces/films.interface';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop-detail',
  templateUrl: './slideshow-backdrop-detail.component.html',
  styleUrls: ['./slideshow-backdrop-detail.component.scss'],
})
export class SlideshowBackdropDetailComponent implements OnInit {

  @Input("data") peliculasRecientes: MovieDetail[] = [];
  slideOpts = {
    slidesPerView: 1.1,
    initialSlide: 0,
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
