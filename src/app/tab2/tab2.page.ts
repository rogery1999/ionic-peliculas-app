import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Movie } from '../interfaces/films.interface';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar: string = '';
  ideas : string[] = ['Spider-man', 'Super-man', 'Wolverine', 'Doctor Strange'];
  peliculas: Movie[] = [];
  cargando: boolean = false;

  constructor(
    private ms: MoviesService,
    private modalController: ModalController
  ) {}

  buscar(event: any){
    const valor = event.detail.value as string;
    if( valor.length === 0 ){
      this.cargando = false;
      this.peliculas = [];
      return;
    }
    this.cargando = true;
    this.ms.searchMovie(valor).subscribe(
      (response) => {
        this.cargando = false;
        this.peliculas = response.results;
      }
    );
  }

  ideasClick(idea: string){
    this.textoBuscar = idea;
  }

  async mostrarDetalles(id: string){
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: { id }
    });
    return modal.present();
  }
}
