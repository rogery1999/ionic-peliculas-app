import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/app/interfaces/films.interface';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent {

  @Input("data") peliculasPopulares: Movie[] = [];
  @Output("cargar") eventLoadMore: EventEmitter<boolean> = new EventEmitter<boolean>();
  slideOpts = {
    slidesPerView: 2.5,
    initialSlide: 1,
    speed: 400,
    freeMode: false,
    spaceBetween: -20
  };

  constructor(
    private modalController: ModalController
  ) { }

  cargarMas(){
    this.eventLoadMore.emit(true);
  }

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
