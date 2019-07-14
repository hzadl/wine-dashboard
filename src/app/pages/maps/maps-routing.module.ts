import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapsComponent } from './maps.component';
import { PatchMapComponent } from './patch-map/patchmap.component';
import { SensorsMapComponent } from './sensors/sensors.component';
import { NDVIMapComponent } from './ndvi/ndvi.component';
import { ImageMapComponent } from './image-map/image-map.component';
import { SensorDetailsComponent } from './sensor-details/sensordetails.component';
import { ImageDetailsComponent } from './image-details/imagedetails.component';

const routes: Routes = [{
  path: '',
  component: MapsComponent,
  children: [{
    path: 'patches',
    component: PatchMapComponent,
  }, {
    path: 'sensorsmap',
    component: SensorsMapComponent,
  }, {
    path: 'ndvimap',
    component: NDVIMapComponent,
  }, {
    path: 'imagemap',
    component: ImageMapComponent,
  }, {
    path: 'sensordetails',
    component: SensorDetailsComponent,
  }, {
    path: 'imagedetails',
    component: ImageDetailsComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsRoutingModule { }

export const routedComponents = [
  MapsComponent,
  PatchMapComponent,
  SensorsMapComponent,
  NDVIMapComponent,
  ImageMapComponent,
  SensorDetailsComponent,
  ImageDetailsComponent,
];
