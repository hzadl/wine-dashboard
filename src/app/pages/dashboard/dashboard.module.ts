import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { EchartsLineComponent } from './charts/echarts-line.component';
import { EchartsBarComponent } from './charts/echarts-bar.component';
import { SprayBarComponent } from './charts/spray-bar.component';
import { WeatherService } from '../../@core/mock/weather.service'


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule
  ],
  declarations: [
    DashboardComponent,
    EchartsLineComponent,
    EchartsBarComponent,
    SprayBarComponent
  ],
  providers: [
    WeatherService,
  ]
})
export class DashboardModule { }
