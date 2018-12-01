import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';


import { PressupostService } from '../../services/service.index';
import { PersonaService } from '../../services/service.index';

import { Persona } from '../../models/persona.model';
import { Pressupost } from '../../models/pressupost.model';

import swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ReservaService } from '../../services/reserva/reserva.service';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-pressupostos',
  templateUrl: './pressupostos.component.html'

})
export class PressupostosComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  closeResult: string;
  public model: any;



  nomsclients = [];
  clients: Persona[] = [];
  pressupostos: Pressupost[] = [];
  constructor(

    public _pressupostosService: PressupostService,
    public _personesService: PersonaService,
    public modalService: NgbModal,
    private _reservaService: ReservaService
  ) { }

  ngOnInit() {
    this.carregarPressupostos();
    this.carregarClients();
  }



  obteniretiquetaFormulari( estat: string): string {
    switch (estat) {
      case 'vigent':
          return 'label label-info';

      case 'anulat':
      return 'label label-warning';

      case 'esborrat':
        return 'label label-danger';

        case 'facturat':
        return 'label label-success';

        case 'confirmat':
        return 'label label-primary';


      }
  }

  carregarClients() {
    this._personesService.cargarPersones()
        .subscribe( persones => {
          console.log(persones);
          this.clients = persones;


          for (let _i = 0; _i < this.clients.length; _i++) {
              this.nomsclients.push(this.clients[_i].nombre);

          }
          console.log(this.nomsclients);


        });
  }

  carregarPressupostos() {
    this._pressupostosService.carregarPressupostos()
        .subscribe( pressupostos => this.pressupostos = pressupostos);
  }

  buscarClient( termino: string ) {

    if ( termino.length <= 0 ) {
      this.carregarClients();
      return;
    }
    this._personesService.buscarPersones( termino )
      .subscribe( persones => this.clients = persones);

  }

  buscarPressupost( termino: string ) {

    console.log('buscant pressupost!' + termino);
    if ( termino.length <= 0 ) {
      this.carregarPressupostos();
      return;
    }
    this._pressupostosService.buscarPressupostos( termino )
      .subscribe( pressupostos => this.pressupostos = pressupostos);

  }

  borrarPressupost (termino: string) {
    swal({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this._reservaService.lliuradatesBookingPerPressupos(termino)
        .subscribe( resp => {
          console.log(resp);
          this._pressupostosService.borrarPressupost(termino)
          .subscribe( pressupost => {
            this.carregarPressupostos();
            console.log(pressupost);
          });
        });

      }
    });

  }

  anularPressupost( termino: string) {
    swal({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this._pressupostosService.anularPressupost(termino)
      .subscribe( pressupost => {
        this.carregarPressupostos();
        console.log(pressupost);
        this.carregarPressupostos();
      });
      }
    });
  }

//   openModal() { this.modalRef = this.modalService.open(); }
// closeModal() { this.modalRef.close(); }

open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

  formatter = (result: string) => result.toUpperCase();

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.nomsclients.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

}
