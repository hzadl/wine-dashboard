import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Farm & Business',
    icon: 'nb-home',
    link: '/pages/farm-business',
    home: true,
  },
  {
    title: 'Maps',
    icon: 'nb-location',
    children: [
      {
        title: 'NDVI Map',
        link: '/pages/maps/ndvimap',
      },
      {
        title: 'Patch Map',
        link: '/pages/maps/patches',
      },
      {
        title: 'Sensor Map',
        link: '/pages/maps/sensorsmap',
      }
    ],
  },
];
