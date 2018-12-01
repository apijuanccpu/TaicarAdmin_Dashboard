import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { FacturaService } from '../../services/factura/factura.service';
import { Factura } from '../../models/factura.model';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html'
})
export class FacturaComponent implements OnInit {


  factura: Factura = new Factura(0, null, null, null, null, 0, 0, 'vigent', '');
  carregant = true;


  constructor(
    public _facturaService: FacturaService,
    public _clientsService: PersonaService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe( params => {
      this.carregant = true;
      const vid = params['id'];
      this.cargarFactura(vid);
    });
   }

  ngOnInit() {
  }

  cargarFactura( id: string ) {
    this._facturaService.carregarFactura( id )
          .subscribe( factura => {
            this.factura = factura;
            console.log(factura);
            // this.cargarDetall(id);
            this.carregant = false;
          });
  }

}
