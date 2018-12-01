import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { PAGES_ROUTES } from './pages.routes';
// ng2-charts
import { ChartsModule } from 'ng2-charts';

// Calendari
import './../../../node_modules/flatpickr/dist/flatpickr.css';
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { FlatpickrModule } from 'angularx-flatpickr';

import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';


import { DashboardComponent } from './dashboard/dashboard.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

// import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
// import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
// import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
// import { PromesasComponent } from './promesas/promesas.component';
// import { RxjsComponent } from './rxjs/rxjs.component';
// import { ProfileComponent } from './profile/profile.component';
// import { UsuariosComponent } from './usuarios/usuarios.component';
import { CalendariComponent } from './calendari/calendari.component';
// import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
// import { HospitalesComponent } from './hospitales/hospitales.component';
// import { MedicosComponent } from './medicos/medicos.component';
// import { MedicoComponent } from './medicos/medico.component';
// import { BusquedaComponent } from './busqueda/busqueda.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { ClientComponent } from './clients/client.component';
import { VehicleComponent } from './vehicles/vehicle.component';
import { PersonesComponent } from './persones/persones.component';
import { PersonaComponent } from './persones/persona.component';
import { PressupostosComponent } from './pressupostos/pressupostos.component';
import { PressupostComponent } from './pressupostos/pressupost.component';
import { FacturacioComponent } from './facturacio/facturacio.component';
import { FacturaComponent } from './facturacio/factura.component';

import { ReservesComponent } from './reserves/reserves.component';
import { Caravana2Component } from './vehicles/caravana2.component';
import { VerificaTokenGuard, AdminGuard } from '../services/service.index';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ToastrModule } from 'ngx-toastr';
import { NotificacionsComponent } from './notificacions/notificacions.component';


const routes: Routes = [
    {
    path: '',
    children: [
      {
      path: 'dashboard',
      canActivate: [ VerificaTokenGuard ],
      data: {
        title: 'Starter Page',
        urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Starter Page' }]
      },
      component: DashboardComponent
    },
    {
        path: 'pressupostos',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Pressupostos', url: '/dashboard' }, { title: 'Gestió de pressupostos' }]
        },
        component: PressupostosComponent
    },
    {
        path: 'pressupost/:id?/:idclient?',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Pressupost', url: '/dashboard' }, { title: 'Gestió de pressupostos' }]
        },
        component: PressupostComponent
    },
    {
        path: 'vehicles',
        data: {
          title: 'Vehicles',
          urls: [{ title: 'Vehicles', url: '/dashboard' }, { title: 'Gestió de vehicles' }]
        },
        component: VehiclesComponent
    },
    {
        path: 'vehicle/:id',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Pressupostos', url: '/dashboard' }, { title: 'Gestió de pressupostos' }]
        },
        component: VehicleComponent
    },
    {
        path: 'persones',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Pressupostos', url: '/dashboard' }, { title: 'Gestió de pressupostos' }]
        },
        component: PersonesComponent
    },
    {
        path: 'persona/:dni?/:dnipers?',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Pressupostos', url: '/dashboard' }, { title: 'Gestió de pressupostos' }]
        },
        component: PersonaComponent
    },
    {
        path: 'reserves',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Pressupostos', url: '/dashboard' }, { title: 'Gestió de pressupostos' }]
        },
        component: ReservesComponent
    },
    {
        path: 'factura/:id',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Factura', url: '/factura' }, { title: 'Gestió de Factura' }]
        },
        component: FacturaComponent
    },
    {
        path: 'facturacio',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Pressupostos', url: '/dashboard' }, { title: 'Gestió de pressupostos' }]
        },
        component: FacturacioComponent
    },
    {
        path: 'calendari',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Calendari', url: '/calendari' }, { title: 'Gestió de calendari' }]
        },
        component: CalendariComponent
    },
    {
        path: 'notificacions',
        data: {
          title: 'Taicar - Admin',
          urls: [{ title: 'Notificacions', url: '/notificacions' }, { title: 'Gestió de notificacons' }]
        },
        component: NotificacionsComponent
    },
    {
    path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data: {
            title: 'Gestió Usuaris',
            urls: [{ title: 'Usuarios', url: '/dashboard' }, { title: 'Gestió de pressupostos' }]
          },
    }
    ]
    }
  ];


@NgModule({
    declarations: [
        // CommonModule,
        DashboardComponent,
        PressupostosComponent,
        UsuariosComponent,
        CalendariComponent,
        // PagesComponent,
        // DashboardComponent,
        // ProgressComponent,
        // Graficas1Component,
        // IncrementadorComponent,
        // GraficoDonaComponent,
        // AccoutSettingsComponent,
        // PromesasComponent,
        // RxjsComponent,
        // ProfileComponent,
        // UsuariosComponent,
        // // ModalUploadComponent,
        // HospitalesComponent,
        // MedicosComponent,
        // MedicoComponent,
        // BusquedaComponent,
        VehiclesComponent,
        ClientComponent,
        VehicleComponent,
        PersonesComponent,
        PersonaComponent,
        PressupostosComponent,
        PressupostComponent,
        ReservesComponent,
        FacturacioComponent,
        FacturaComponent,
        NotificacionsComponent
    ],
    exports: [
        // CalendariComponent
        // DashboardComponent,
        // ProgressComponent,
        // Graficas1Component
    ],
    imports: [
        FormsModule,
        CommonModule,
        NgbModule,
        ToastrModule.forRoot(),
        FlatpickrModule.forRoot(),
        ChartsModule,
        PipesModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
          }),
        RouterModule.forChild(routes)
    ]
})
export class PagesModule { }
