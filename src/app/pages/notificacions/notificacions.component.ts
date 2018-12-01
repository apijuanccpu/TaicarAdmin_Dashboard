import { Component, OnInit } from '@angular/core';
import { NotificacionsService } from '../../services/service.index';
import { Pressupost } from '../../models/pressupost.model';
import * as moment from 'moment';

@Component({
  selector: 'app-notificacions',
  templateUrl: './notificacions.component.html'
})
export class NotificacionsComponent implements OnInit {


  pressupostosambvigencia: Pressupost[] = [];

  constructor(public _notificacionsService: NotificacionsService) { }

  notifications: Object[] = [
  ];

  notifs: Object[] = [
    {
      image: 'assets/images/users/1.jpg',
      name: 'James Anderson',
      comment:
        // tslint:disable-next-line:max-line-length
        'Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.',
      date: 'April 14, 2016',
      status: 'Pending',
      labelcolor: 'label-light-info'
    },
    {
      image: 'assets/images/users/2.jpg',
      name: 'Michael Jorden',
      comment:
        // tslint:disable-next-line:max-line-length
        'Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.',
      date: 'April 14, 2016',
      status: 'Approved',
      labelcolor: 'label-light-success'
    },
    {
      image: 'assets/images/users/4.jpg',
      name: 'Johnathan Doeting',
      comment:
        // tslint:disable-next-line:max-line-length
        'Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.',
      date: 'April 14, 2016',
      status: 'Rejected',
      labelcolor: 'label-light-danger'
    },
    {
      image: 'assets/images/users/5.jpg',
      name: 'James Anderson',
      comment:
        // tslint:disable-next-line:max-line-length
        'Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has beenorem Ipsum is simply dummy text of the printing and type setting industry.',
      date: 'April 14, 2016',
      status: 'Pending',
      labelcolor: 'label-light-info'
    }
  ];

  ngOnInit() {
    console.log(this.notifs);
    this.carregarPressupostosSegonsDataVigencia();
  }
  carregarPressupostosSegonsDataVigencia() {
    this._notificacionsService.carregarpressupostos_datavigencia(moment().add(0, 'days').format('YYYY-MM-DD'))
      .subscribe( resp => {
        this.pressupostosambvigencia = resp;
        console.log(this.pressupostosambvigencia);
        for (const entry of this.pressupostosambvigencia){
          const notificacio: Object = {

            image: 'assets/images/users/5.jpg',
            name: 'Pressupost a punt de caducar',
            comment: 'Pressupost:' + entry._id + '/ Vigència:' + entry.data_vigencia,
            status: 'Pending',
            date: 'April 14, 2016',
            labelcolor: 'label-light-info'
          };
          this.notifications.push(notificacio);
        }
      });
}

}
