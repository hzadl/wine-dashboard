import { ActivatedRoute, Router } from '@angular/router';

import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'ngx-imagedetails',
  styleUrls: ['./imagedetails.component.scss'],
  templateUrl: './imagedetails.component.html',
})

export class ImageDetailsComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  dates = ['2016_12_18', '2017_01_17', '2017_01_27', '2017_02_16', '2017_02_26', '2017_03_08', '2017_03_18', '2017_03_28', '2017_05_07', '2017_06_26', '2017_07_01', '2017_07_06', '2017_07_11', '2017_07_21', '2017_07_26', '2017_08_20', '2017_08_30', '2017_09_24', '2017_09_29', '2017_10_09', '2017_10_14', '2017_10_29', '2017_11_08', '2017_11_28', '2017_12_13', '2018_01_17', '2018_01_27', '2018_02_06', '2018_02_11', '2018_02_26', '2018_03_03', '2018_03_08', '2018_03_13', '2018_03_18', '2018_03_23', '2018_03_28', '2018_04_07', '2018_04_12', '2018_04_17', '2018_04_22', '2018_04_27', '2018_05_12', '2018_06_06', '2018_06_16', '2018_06_21', '2018_07_06', '2018_07_16', '2018_08_10', '2018_08_20', '2018_08_25', '2018_09_04', '2018_09_09', '2018_09_14', '2018_09_19', '2018_09_24', '2018_09_29', '2018_10_04', '2018_10_29', '2018_11_18', '2018_12_23', '2019_01_12', '2019_01_22', '2019_02_01', '2019_02_11', '2019_02_16', '2019_02_21'];

  imageData = {
    '1': {
      'Image name': 'Row 22 vine number 1',
      'date': '2019_04_17',
      'img': 'assets/vineimages/1.JPG',
      'Leaf area index': 1.687,
      'AI Density Index': 64,
      'Growth Stage': 41,
      'Grape Bunch Count': 0,
      'Disease Detected': true,
      'Disease Name': 'Downy Mildew',
      'Green Shoot Count': 2,
      'Temperature': 30,
      'Soil Moisture': 13.5,
    },
    '2': {
      'Image name': 'Row 22 vine number 4',
      'date': '2019_04_17',
      'img': 'assets/vineimages/2.JPG',
      'Leaf area index': 2.432,
      'AI Density Index': 83,
      'Growth Stage': 41,
      'Grape Bunch Count': 0,
      'Disease Detected': true,
      'Disease Name': 'Downy Mildew',
      'Green Shoot Count': 2,
      'Temperature': 30,
      'Soil Moisture': 13.5,
    }, '3': {
      'Image name': 'Row 22 vine number 7',
      'date': '2019_04_17',
      'img': 'assets/vineimages/3.JPG',
      'Leaf area index': 2.076,
      'AI Density Index': 80,
      'Growth Stage': 41,
      'Grape Bunch Count': 0,
      'Disease Detected': true,
      'Disease Name': 'Downy Mildew',
      'Green Shoot Count': 2,
      'Temperature': 30,
      'Soil Moisture': 13.5,
    }, '4': {
      'Image name': 'Row 22 vine number 10',
      'date': '2019_04_17',
      'img': 'assets/vineimages/4.JPG',
      'Leaf area index': 2.421,
      'AI Density Index': 86,
      'Growth Stage': 41,
      'Grape Bunch Count': 0,
      'Disease Detected': false,
      'Disease Name': 'Downy Mildew',
      'Green Shoot Count': 2,
      'Temperature': 30,
      'Soil Moisture': 13.5,
    }, '5': {
      'Image name': 'Row 22 vine number 13',
      'date': '2019_04_17',
      'img': 'assets/vineimages/5.JPG',
      'Leaf area index': 2.383,
      'AI Density Index': 85,
      'Growth Stage': 41,
      'Grape Bunch Count': 0,
      'Disease Detected': false,
      'Disease Name': 'Downy Mildew',
      'Green Shoot Count': 2,
      'Temperature': 30,
      'Soil Moisture': 13.5,
    }, '6': {
      'Image name': 'Row 22 vine number 16',
      'date': '2019_04_17',
      'img': 'assets/vineimages/6.JPG',
      'Leaf area index': 2.338,
      'AI Density Index': 87,
      'Growth Stage': 41,
      'Grape Bunch Count': 0,
      'Disease Detected': false,
      'Disease Name': 'Downy Mildew',
      'Green Shoot Count': 2,
      'Temperature': 30,
      'Soil Moisture': 13.5,
    }, '7': {
      'Image name': 'Row 22 vine number 19',
      'date': '2019_04_17',
      'img': 'assets/vineimages/7.JPG',
      'Leaf area index': 2.132,
      'AI Density Index': 83,
      'Growth Stage': 41,
      'Grape Bunch Count': 0,
      'Disease Detected': false,
      'Disease Name': 'Downy Mildew',
      'Green Shoot Count': 2,
      'Temperature': 30,
      'Soil Moisture': 13.5,
    }, '8': {
      'Image name': 'Row 22 vine number 22',
      'date': '2019_04_17',
      'img': 'assets/vineimages/8.JPG',
      'Leaf area index': 1.735,
      'AI Density Index': 88,
      'Growth Stage': 41,
      'Grape Bunch Count': 0,
      'Disease Detected': false,
      'Disease Name': 'Downy Mildew',
      'Green Shoot Count': 2,
      'Temperature': 30,
      'Soil Moisture': 13.5,
    }, '9': {
      'Image name': 'Row 22 vine number 25',
      'date': '2019_04_17',
      'img': 'assets/vineimages/9.JPG',
      'Leaf area index': 2.288,
      'AI Density Index': 90,
      'Growth Stage': 41,
      'Grape Bunch Count': 0,
      'Disease Detected': false,
      'Disease Name': 'Downy Mildew',
      'Green Shoot Count': 2,
      'Temperature': 30,
      'Soil Moisture': 13.5,
    }, '10': {
      'Image name': 'Row 22 vine number 28',
      'date': '2019_04_17',
      'img': 'assets/vineimages/10.JPG',
      'Leaf area index': 2.489,
      'AI Density Index': 87,
      'Growth Stage': 41,
      'Grape Bunch Count': 0,
      'Disease Detected': false,
      'Disease Name': 'Downy Mildew',
      'Green Shoot Count': 2,
      'Temperature': 30,
      'Soil Moisture': 13.5,
    }, '11': {
      'Image name': 'Row 22 vine number 31',
      'date': '2019_04_17',
      'img': 'assets/vineimages/11.JPG',
      'Leaf area index': 2.699,
      'AI Density Index': 79,
      'Growth Stage': 41,
      'Grape Bunch Count': 0,
      'Disease Detected': false,
      'Disease Name': 'Downy Mildew',
      'Green Shoot Count': 2,
      'Temperature': 30,
      'Soil Moisture': 13.5,
    }, '12': {
      'Image name': 'Row 22 vine number 34',
      'date': '2019_04_17',
      'img': 'assets/vineimages/12.JPG',
      'Leaf area index': 79,
      'AI Density Index': 1.707,
      'Growth Stage': 41,
      'Grape Bunch Count': 0,
      'Disease Detected': false,
      'Disease Name': 'Downy Mildew',
      'Green Shoot Count': 2,
      'Temperature': 30,
      'Soil Moisture': 13.5,
    }
  };

  data = [];

  imageId = ''
  constructor(private activatedRoute: ActivatedRoute, private theme: NbThemeService) {

  }

  ngOnInit() {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        console.log('params = ' + JSON.stringify(params))
        console.log('name = ' + params['name']);
        this.imageId = params['name']
        this.data = this.imageData[this.imageId]
      });
  }
  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.danger, colors.primary, colors.info],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },
        dataZoom: {
          show: true,
          start: 70
        },
        legend: {
          left: 'left',
          data: ['NDVI'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        xAxis: [
          {
            type: 'category',
            data: ['2016_12_18', '2017_01_17', '2017_01_27', '2017_02_16', '2017_02_26', '2017_03_08', '2017_03_18', '2017_03_28', '2017_05_07', '2017_06_26', '2017_07_01', '2017_07_06', '2017_07_11', '2017_07_21', '2017_07_26', '2017_08_20', '2017_08_30', '2017_09_24', '2017_09_29', '2017_10_09', '2017_10_14', '2017_10_29', '2017_11_08', '2017_11_28', '2017_12_13', '2018_01_17', '2018_01_27', '2018_02_06', '2018_02_11', '2018_02_26', '2018_03_03', '2018_03_08', '2018_03_13', '2018_03_18', '2018_03_23', '2018_03_28', '2018_04_07', '2018_04_12', '2018_04_17', '2018_04_22', '2018_04_27', '2018_05_12', '2018_06_06', '2018_06_16', '2018_06_21', '2018_07_06', '2018_07_16', '2018_08_10', '2018_08_20', '2018_08_25', '2018_09_04', '2018_09_09', '2018_09_14', '2018_09_19', '2018_09_24', '2018_09_29', '2018_10_04', '2018_10_29', '2018_11_18', '2018_12_23', '2019_01_12', '2019_01_22', '2019_02_01', '2019_02_11', '2019_02_16', '2019_02_21'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
              interval: 0,
              rotate: 45,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },

          }
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        series: [
          {
            name: 'NDVI',
            type: 'line',
            data: [0.527, 0.542, 0.53, 0.485, 0.532, 0.51, 0.51, 0.395, 0.458, 0.335, 0.343, 0.359, 0.354, 0.445, 0.537, 0.482, 0.452, 0.452, 0.443, 0.452, 0.46, 0.439, 0.23, 0.342, 0.176, 0.354, 0.335, 0.376, 0.508, 0.55, 0.474, 0.347, 0.338, 0.361, 0.415, 0.461, 0.368, 0.194, 0.494, 0.536, 0.549, 0.504, 0.487, 0.484, 0.462, 0.438, 0.382, 0.446, 0.464, 0.449, 0.471, 0.232, 0.227, 0.252, 0.272, 0.383, 0.404, 0.351, 0.378, 0.42, 0.493, 0.461, 0.423, 0.485, 0.29, 0.463]
            ,
          }
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  onMenuItemSelected(event) {
    console.log(event);
  }

}
