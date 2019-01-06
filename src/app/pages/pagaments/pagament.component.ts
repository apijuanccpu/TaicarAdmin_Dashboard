import { Component, OnInit } from '@angular/core';
import { PagamentService, PersonaService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pagament } from 'src/app/models/pagament.model';
import { FacturaService } from '../../services/factura/factura.service';
import { Factura } from 'src/app/models/factura.model';
import { Persona } from 'src/app/models/persona.model';

@Component({
  selector: 'app-pagament',
  templateUrl: './pagament.component.html'

})
export class PagamentComponent implements OnInit {

  carregant = true;
  factures: Factura[] = [];
  clients: Persona[] = [];
  esnou: boolean;
 pagament: Pagament;
  closeResult: string;

  constructor(
    // private toastr: ToastrService,
    public _pagamentService: PagamentService,
    public _clientsService: PersonaService,
    public _facturesService: FacturaService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalService: NgbModal
  ) {

    activatedRoute.params.subscribe( params => {

      const id = params['id'];
      this.carregant = true;

      console.log(params);
      console.log(id);

      if ( id !== 'nuevo' ) {
        this.carregarPagamentId( id );
        this.esnou = false;
        console.log(this.esnou);


      } else {
        this.esnou = true;
        this.carregant = false;
        this.pagament = new Pagament('', '', 0, '', '');
        console.log(this.esnou);


      }

    });
   }

  ngOnInit() {

    this.carregarClients();
    this.carregarFactures();
  }

  guardaPagament(vpago: Pagament) {
    if (this.esnou) {
      this._pagamentService.altaPagament(vpago)
      .subscribe( pagament => {
        console.log(pagament);
      });
    } else {
      this._pagamentService.actualitzaPagament(vpago)
        .subscribe( pagament => {
          console.log(pagament);
        });
    }

  }

  carregarPagamentId(vpago: string) {
    this._pagamentService.carregarPagamentsID(vpago)
      .subscribe( pagament => {
        console.log(pagament);
        this.pagament = pagament;
        this.carregant = false;
      });
  }

  carregarFactures() {
    this._facturesService.carregarFactures()
    .subscribe( factures => {

      this.factures = factures;
    });
  }
  carregarClients() {
    this._clientsService.cargarPersones()
    .subscribe( persones => {

      this.clients = persones;
    });
  }

}
