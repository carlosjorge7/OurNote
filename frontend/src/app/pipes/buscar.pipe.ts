import { Pipe, PipeTransform } from '@angular/core';
import { Nota } from '../modelos/Nota'
@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

  transform(notas: Nota[], valor: string): Nota[] {
    if(valor.length == 0){
      return notas;
    }
    valor = valor.toLowerCase();

    // tipo foreach --> la funcion filter devuelve al array filtrado
    return notas.filter((nota) => {
      return nota.titulo.toLowerCase().includes(valor)
              || nota.descripcion.includes(valor) || nota.created_at.includes(valor);
    });
  }

}
