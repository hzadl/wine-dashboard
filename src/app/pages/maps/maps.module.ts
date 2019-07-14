import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { MapsRoutingModule, routedComponents } from './maps-routing.module';
import {SafePipe} from '../../@theme/pipes/safe.pipe'
import {SafeStylePipe} from '../../@theme/pipes/safe-style.pipe'

@NgModule({
  imports: [
    ThemeModule,
    LeafletModule.forRoot(),
    MapsRoutingModule,
    NgxEchartsModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
  ],
  exports: [],
  declarations: [
    ...routedComponents,
    SafePipe,
    SafeStylePipe,
  ]
})
export class MapsModule { }
