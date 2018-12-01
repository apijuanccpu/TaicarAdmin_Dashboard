import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
{
  path: '',
  title: 'Principal',
  icon: 'mdi mdi-gauge',
  class: 'has-arrow',
  label: '3',
  labelClass: 'label label-rouded label-themecolor pull-right',
  extralink: false,
  submenu: []
},
{
  path: '',
  title: 'Taules Taicar',
  icon: 'mdi mdi-gauge',
  class: 'has-arrow',
  label: '3',
  labelClass: 'label label-rouded label-themecolor pull-right',
  extralink: false,
  submenu: [
    { path: '/vehicles',
      title: 'Vehicles', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    { path: '/persones',
      title: 'Clients', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
  ]
},
{
  path: '',
  title: 'Vendes',
  icon: 'mdi mdi-gauge',
  class: 'has-arrow',
  label: '3',
  labelClass: 'label label-rouded label-themecolor pull-right',
  extralink: false,
  submenu: [
    { path: '/pressupostos',
      title: 'Pressupostos', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    { path: '/reserves',
      title: 'Reserves', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    { path: '/calendari',
      title: 'Calendari', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    { path: '/facturacio',
      title: 'Facturacio', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
  ]
}

];
