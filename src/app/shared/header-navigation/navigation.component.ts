import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbPanelChangeEvent, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NotificacionsService } from '../../services/service.index';
import * as moment from 'moment';
import { Pressupost } from '../../models/pressupost.model';
declare var $: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  pressupostosambvigencia: Pressupost[] = [];

  public config: PerfectScrollbarConfigInterface = {};
  constructor(
    private modalService: NgbModal,
    public _notificacionsService: NotificacionsService
    ) {
        this.carregarPressupostosSegonsDataVigencia();

    }

  public showSearch = false;

  // This is for Notifications
  notifications: Object[] = [
    // {
    //   round: 'round-danger',
    //   icon: 'ti-link',
    //   title: 'Luanch Admin',
    //   subject: 'Just see the my new admin!',
    //   time: '9:30 AM'
    // },
    // {
    //   round: 'round-success',
    //   icon: 'ti-calendar',
    //   title: 'Event today',
    //   subject: 'Just a reminder that you have event',
    //   time: '9:10 AM'
    // },
    // {
    //   round: 'round-info',
    //   icon: 'ti-settings',
    //   title: 'Settings',
    //   subject: 'You can customize this template as you want',
    //   time: '9:08 AM'
    // },
    // {
    //   round: 'round-primary',
    //   icon: 'ti-user',
    //   title: 'Pavan kumar',
    //   subject: 'Just see the my admin!',
    //   time: '9:00 AM'
    // }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  ngAfterViewInit() {}

  carregarPressupostosSegonsDataVigencia() {
      this._notificacionsService.carregarpressupostos_datavigencia(moment().add(0, 'days').format('YYYY-MM-DD'))
        .subscribe( resp => {
          this.pressupostosambvigencia = resp;
          console.log(this.pressupostosambvigencia);
          for (const entry of this.pressupostosambvigencia){
            const notificacio: Object = {
              round: 'round-info',
              icon: 'ti-settings',
              title: 'Pressupost a punt de caducar',
              subject: 'Pressupost:' + entry._id + '/ Vigència:' + entry.data_vigencia,
              time: '9:08 AM'
            };
            this.notifications.push(notificacio);
          }
        });
  }
}
