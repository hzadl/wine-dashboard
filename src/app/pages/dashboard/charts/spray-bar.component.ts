import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-spray-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class SprayBarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  dates = ['9/18/14', '9/20/14', '10/9/14', '10/16/14', '10/20/14', '10/30/14', '10/31/14', '11/10/14', '11/25/14', '12/8/14', '12/24/14', '12/27/14', '4/13/15', '6/12/15', '9/16/15', '9/18/15', '9/28/15', '10/14/15', '10/19/15', '10/27/15', '11/9/15', '11/24/15', '12/9/15', '12/21/15', '6/21/16', '8/31/16', '9/16/16', '10/7/16', '10/13/16', '10/19/16', '10/31/16', '11/15/16', '11/16/16', '11/19/16', '12/21/16', '12/22/16', '1/2/17', '1/3/17', '4/17/17', '5/26/17', '8/22/17', '9/26/17', '9/27/17', '10/1/17', '10/6/17', '10/9/17', '10/16/17', '11/7/17', '11/10/17', '11/14/17', '11/27/17', '12/7/17', '12/11/17', '12/12/17', '12/20/17', '8/21/18', '10/2/18', '10/18/18', '10/22/18', '10/23/18', '10/29/18', '11/9/18', '11/20/18']
  growthStage = [12, 15, 16, 20, 23, 26, 26, 29, 32, 34, 35, 35, 43, 50, 9, 9, 14, 18, 18, 21, 31, 32, 32, 34, 1, 4, 11, 14, 15, 17, 19, 27, 27, 29, 33, 33, 33, 33, 41, 43, 1, 12, 12, 13, 14, 15, 19, 27, 27, 29, 33, 32, 33, 33, 33, 1, 14, 19, 20, 21, 26, 27, 31]
  Grasses = [0, 0, 0, 0, 0, 0, 2.54, 0, 0, 0, 0, 3.15, 3.15, 2.56, 2.575, 2.66, 0, 0, 0, 0, 0, 0, 0, 3.35, 2.56, 2.56, 0, 0, 0, 0, 0, 3.35, 0, 0, 0, 2.56, 0, 3.35, 3.35, 3.35, 2.56, 0, 0, 0, 0, 0, 0, 2.56, 3.35, 0, 0, 0, 0, 3.52, 0, 1.6905, 0, 0, 0, 3.35, 0, 0, 0]
  Suckers = [0, 0, 0, 0.99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.21, 0, 0, 0, 0]
  Powdery = [2.4, 3.0, 4.0, 0, 4.5, 4.5, 0, 4.5, 4.5, 3.5, 3.0, 0, 0, 0, 0.3, 0, 2.5, 0.399, 0, 5.0, 5.0, 5.0, 5.0, 5.0, 0, 0, 0.3, 4.5, 0, 0.399, 0.125, 0, 0.15625, 5.0, 6.75, 0, 6.75, 0, 0, 0, 0, 0.3, 4.5, 0.3, 0.36, 0, 6.0, 0, 0, 6.0, 6.0, 6.75, 6.0, 0, 6.0, 0, 0.36, 6.0, 0, 0, 0.3, 6.0, 7.5]
  Downy = [0, 0, 0, 0, 0, 2.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 2.1, 0, 0, 0, 0, 0, 0, 0, 0.32336000000000004, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2.025, 0, 0, 0, 0, 0, 0, 1.5, 0]
  AppleMoth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      this.options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data:['Grasses & Weeds','Suckers','Powdery Mildew','Downy Mildew','Lightbrown Apple Moth','Growth Stage']
        },
        dataZoom: {
          show: true,
          start : 90
      },
        xAxis: [
          {
            type: 'category',
            data: this.dates,
          },
        ],
        yAxis: [
          {
            type : 'value',
            name: 'Spray volume',
            nameLocation: 'middle',
            nameGap: 50,
            axisLabel : {
                formatter: '{value}kg'
            },  
        },
        {
          type : 'value',
          name: 'Growth stage',
          nameLocation: 'middle',
          nameGap: 50,
          axisLabel : {
              formatter: '{value}'
          },  
      }
        
        ],
        series: [
          {
            name:'Grasses & Weeds',
            type:'bar',
            data:this.Grasses
        },
        {
          name:'Suckers',
          type:'bar',
          data:this.Suckers
      },
      {
        name:'Powdery Mildew',
        type:'bar',
        data:this.Powdery
    },
    {
      name:'Downy Mildew',
      type:'bar',
      data:this.Downy
  },
  {
    name:'Lightbrown Apple Moth',
    type:'bar',
    data:this.AppleMoth

},{
  name:'Growth Stage',
  type:'line',
  yAxisIndex:1,
  data:this.growthStage,
  markPoint : {
      data : [
        {type : 'max', name: 'Max Growth Stage'},
        {type : 'min', name: 'Min Growth Stage'}
      ]
  },
  markLine : {
      data : [
          {type : 'average', name : 'Average Growth Stage'}
      ] 
  }
}
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
