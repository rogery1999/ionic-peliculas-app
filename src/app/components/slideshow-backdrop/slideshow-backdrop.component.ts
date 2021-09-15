import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/interfaces/films.interface';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input("data") peliculasRecientes: Movie[] = [];
  slideOpts = {
    slidesPerView: 1.1,
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
