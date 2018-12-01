import { Injectable } from '@angular/core';
import { Pressupost } from '../../models/pressupost.model';
import { Persona } from '../../models/persona.model';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { PressupostDetall } from '../../models/pressupostdetall';
import { URL_SERVICIOS } from '../../config/config';
import { Reserva } from '../../models/reserva.model';

import * as moment from 'moment';
import { Factura } from '../../models/factura.model';

@Injectable()
export class FacturaService {

  totalFactures = 0;
  nodisponibles = [];


  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  carregarFactures() {
    const url = URL_SERVICIOS + '/factura';
    return this.http.get( url )
        .map( (resp: any) => {
          this.totalFactures = resp.total;
          return resp.factures;
        });
  }

  crearFactura( vpressupost: Pressupost) {
    console.log(vpressupost);

    const factura = new Factura(vpressupost.num, vpressupost.data, vpressupost.data_vigencia,
        vpressupost.client, null , vpressupost.preu_brut, vpressupost.preu_net, 'vigent', vpressupost.observacions);

    let url = URL_SERVICIOS + '/factura';

      url += '?token=' + this._usuarioService.token;
      console.log(factura);
      return this.http.post( url, factura )
          .map( (resp: any) => {
            // swal('Pressupost Detall Creado', pressupost._id, 'success');
            return resp.factura;
          });
      }
      carregarFactura( id: string) {
        const url = URL_SERVICIOS + '/factura/' + id;

        return this.http.get( url )
                  .map( (resp: any) => resp.factura );
      }

      actualitzar_idfactura_pressupostdetall( pressupost: string, factura: string) {
        let url = URL_SERVICIOS + '/pressupostdetall/actualitzafactura_perpressupost/' + pressupost + '/' + factura ;

        url += '?token=' + this._usuarioService.token;

        return this.http.get( url )
            .map( (resp: any) => {
              // swal('Pressupost Detall Creado', pressupost._id, 'success');
              return resp.pressupostos;
            });
      }

}
