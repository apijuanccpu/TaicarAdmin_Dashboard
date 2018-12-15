import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Despesa } from '../../models/despesa.model';
import { Vehicle } from '../../models/vehicle.model';
import { DespesaService, VehicleService} from '../../services/service.index';


import swal from 'sweetalert2';
@Component({
  selector: 'app-despeses',
  templateUrl: './despeses.component.html'
})
export class DespesesComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  closeResult: string;
  public model: any;

  despesa: Despesa = new Despesa('', 0, null , '', '', '');
  vehicles: Vehicle[] = [];
  despeses: Despesa[] = [];

  constructor(
    public _despesaService: DespesaService,
    public _vehicleService: VehicleService,
    public modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.carregarDespeses();
    this.carregarVehicles();
  }

  carregarDespeses() {
    this._despesaService.carregarDespeses()
      .subscribe( despeses => this.despeses = despeses);
  }

  guardaDespesa( vdesp: Despesa ) {
    this._despesaService.guardarDespesa(vdesp)
        .subscribe( despesa => {
          this.despesa = despesa;
          this.despesa = null;
          this.carregarDespeses();
          this.modalService.dismissAll();
        });
  }

  buscarDespeses( termino: string ) {
    if (termino.length <= 0) {
      this.carregarDespeses();
      return;
    }
    this.despeses = [];
    this._despesaService.buscarDespesa(termino)
      .subscribe( despeses => this.despeses = despeses);

  }
  // carregarDespesa( termino: string ) {
  //   if (termino.length <= 0) {
  //     this.carregarDespeses();
  //     return;
  //   }
  //   this._despesaService.cargarDespesa(termino)
  //     .subscribe( despesa => {
  //       this.despesa = despesa;
  //       // this.open(content);
  //     });


  // }
  carregarVehicles() {
    this._vehicleService.cargarVehicles()
        .subscribe( vehicles => {

          this.vehicles = vehicles;

        });

      }
  borrarDespesa( vdespesa: string ) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + vdespesa,
      type: 'warning',
      showCancelButton: true,
    })
    .then( result => {
      if (result.value) {
        this._despesaService.borrarDespesa( vdespesa )
            .subscribe( () =>  this.carregarDespeses() );
      }
    });
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {

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

}
