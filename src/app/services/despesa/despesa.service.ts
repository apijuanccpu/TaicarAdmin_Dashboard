import { Injectable } from '@angular/core';
import { Pressupost } from '../../models/pressupost.model';
import { Persona } from '../../models/persona.model';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { Despesa } from '../../models/despesa.model';

import * as moment from 'moment';

@Injectable()
export class DespesaService {

  totalDespeses = 0;
  nodisponibles = [];


  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  carregarDespeses() {
    const url = URL_SERVICIOS + '/despesa';
    return this.http.get( url )
        .map( (resp: any) => {
          this.totalDespeses = resp.total;
          return resp.despeses;
        });
  }

  guardarDespesa( vdespesa: Despesa) {
    console.log(vdespesa);

    const despesa = new Despesa(vdespesa.vehicle,
                                vdespesa.preu,
                                vdespesa.data,
                                vdespesa.tipus,
                                vdespesa.observacions);

    let url = URL_SERVICIOS + '/despesa';

      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, despesa )
          .map( (resp: any) => {
            // swal('Pressupost Detall Creado', pressupost._id, 'success');
            return resp.despesa;
          });
      }

      buscarDespesa( termino: string ) {

        const url = URL_SERVICIOS + '/busqueda/coleccion/despeses/' + termino;
        console.log(url);
        return this.http.get( url )
                    .map( (resp: any) => resp.despeses );
      }

      borrarDespesa( iddespesa: string) {

        let url = URL_SERVICIOS + '/despesa/' + iddespesa;
        url += '?token=' + this._usuarioService.token;
        return this.http.delete( url )
                    .map( (resp: any) => resp.despesa );
      }

      cargarDespesa( termino: string ) {

        const url = URL_SERVICIOS + '/despesa/' + termino;
        console.log(url);
        return this.http.get( url )
                    .map( (resp: any) => resp.despesa );
      }



}
