import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import FribaseService from 'src/app/service/fribase.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  id: string | null = null;;
  any2: any;
  constructor(private activate: ActivatedRoute,
    private fire: FribaseService
  ){
   
     
    
  }

  ngOnInit() {
    // Obtener el parámetro 'id' desde la ruta activada
    this.activate.params.subscribe(params => {
      this.id = params['id']; // Aquí aseguramos que el parámetro 'id' sea extraído correctamente
      if (this.id) {
        this.cargarNoticiaPorId(this.id); // Cargar la noticia solo si el id es válido
      }
    });
  }

  cargarNoticiaPorId(id: string) {
    this.fire.getplaceById(id).then(data => {
      this.any2 = data;  // Almacena los datos obtenidos en la variable 'noticia'
      console.log(this.any2);  // Muestra los datos en la consola para verificar
    }).catch(error => {
      console.error('Error al cargar la noticia:', error);
    });
  }
}

