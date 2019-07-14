import { Component, TemplateRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-sensordetails',
  styleUrls: ['./sensordetails.component.scss'],
  templateUrl: './sensordetails.component.html',
})

export class SensorDetailsComponent {

  data = {
    'Weather Station (row 12 east end)': [
      { 'name': 'Air Temperature', 'panelId': 18, 'visible': true, 'width': 150, 'height': 100 },
      { 'name': 'Relative Humidity', 'panelId': 17, 'visible': true, 'width': 150, 'height': 100 },
      { 'name': 'Wind Speed', 'panelId': 4, 'visible': true, 'width': 150, 'height': 100 },
      { 'name': 'Wind Direction', 'panelId': 10, 'visible': true, 'width': 150, 'height': 100 },
      { 'name': 'Period Rainfall', 'panelId': 22, 'visible': true, 'width': 150, 'height': 100 },
      { 'name': 'Vapour Pressure', 'panelId': 8, 'visible': true, 'width': 150, 'height': 100 },
      { 'name': 'Fire Danger Index BETA', 'panelId': 16, 'visible': true, 'width': 150, 'height': 100 },
      { 'name': 'Relative Humidity / Air Temperature', 'panelId': 2, 'visible': true, 'width': 1050, 'height': 300 },
      { 'name': '15min Rainfall', 'panelId': 15, 'visible': true, 'width': 1050, 'height': 300 },
      { 'name': 'Atmospheric Pressure', 'panelId': 7, 'visible': true, 'width': 1050, 'height': 300 },
    ],
    'Dendrometer (row 3, vine 5)': [
      { 'name': 'Stem Diameter', 'panelId': 13, 'visible': true, 'width': 300, 'height': 100 },
      { 'name': 'Temperature', 'panelId': 8, 'visible': true, 'width': 300, 'height': 100 },
      { 'name': 'Battery Level', 'panelId': 12, 'visible': true, 'width': 300, 'height': 100 },
      { 'name': 'Stem Diameter Details', 'panelId': 2, 'visible': true, 'width': 900, 'height': 300 },
      { 'name': 'Temperature Details', 'panelId': 15, 'visible': true, 'width': 900, 'height': 300 },
    ],
    'TEROS Triple Soil Sensor (row 3, vine 5)': [
      { 'name': 'Volumetric Water Content', 'panelId': 14, 'visible': true, 'width': 225, 'height': 100 },
      { 'name': 'Soil EC', 'panelId': 13, 'visible': true, 'width': 225, 'height': 100 },
      { 'name': 'Soil Temperature', 'panelId': 8, 'visible': true, 'width': 225, 'height': 100 },
      { 'name': 'Battery Level', 'panelId': 12, 'visible': true, 'width': 225, 'height': 100 },
      { 'name': 'Volumetric Water Content', 'panelId': 2, 'visible': true, 'width': 900, 'height': 300 },
      { 'name': 'Soil EC / Temperature', 'panelId': 15, 'visible': true, 'width': 900, 'height': 300 },
    ],
    'Soil Sensor 1 (row 3, vine 5)': [
      { 'name': 'Soil Moisture History', 'panelId': 16, 'visible': true, 'width': 900, 'height': 400 },
      { 'name': 'Soil Temperature History', 'panelId': 18, 'visible': true, 'width': 900, 'height': 400 },
    ],
    'Soil Sensor 2 (row 12, vine 22)': [
      { 'name': 'Soil Moisture History', 'panelId': 26, 'visible': true, 'width': 900, 'height': 400 },
      { 'name': 'Soil Temperature History', 'panelId': 27, 'visible': true, 'width': 900, 'height': 400 },
    ],
    'Soil Sensor 3 (row 22, vine 45)': [
      { 'name': 'Soil Moisture History', 'panelId': 17, 'visible': true, 'width': 900, 'height': 400 },
      { 'name': 'Soil Temperature History', 'panelId': 19, 'visible': true, 'width': 900, 'height': 400 },
    ],
    'Soil Sensor 4 (row 33, vine 65)': [
      { 'name': 'Soil Moisture History', 'panelId': 15, 'visible': true, 'width': 900, 'height': 400 },
      { 'name': 'Soil Temperature History', 'panelId': 20, 'visible': true, 'width': 900, 'height': 400 },
    ]
  }
  baseUrls = {
    'Weather Station (row 12 east end)': 'https://riverlandwine.opensensing.com/d-solo/3n8AftmZa/riverland-weather-station?orgId=2&from=',
    'Dendrometer (row 3, vine 5)': 'https://riverlandwine.opensensing.com/d-solo/sgxiY9WWz/riverland-dendrometer?orgId=2&from=',
    'TEROS Triple Soil Sensor (row 3, vine 5)': 'https://riverlandwine.opensensing.com/d-solo/GoRZLaWZk/riverland-soil-moisture?orgId=2&from=',
    'Soil Sensor 1 (row 3, vine 5)': 'https://riverlandwine.opensensing.com/d-solo/GoRZLaWZt/enviropro-80cm-soil-moisture?orgId=2&from=',
    'Soil Sensor 2 (row 12, vine 22)': 'https://riverlandwine.opensensing.com/d-solo/GoRZLaWZt/enviropro-80cm-soil-moisture?orgId=2&from=',
    'Soil Sensor 3 (row 22, vine 45)': 'https://riverlandwine.opensensing.com/d-solo/GoRZLaWZt/enviropro-80cm-soil-moisture?orgId=2&from=',
    'Soil Sensor 4 (row 33, vine 65)': 'https://riverlandwine.opensensing.com/d-solo/GoRZLaWZt/enviropro-80cm-soil-moisture?orgId=2&from=',

  }

  panelIds = [2, 4, 7, 8, 10, 11, 13, 15, 16, 17, 18, 19, 20, 21]
  sensorData = []
  urls = []
  sensorName = ''
  constructor(private activatedRoute: ActivatedRoute, ) {

  }

  ngOnInit() {
    var now = new Date();
    var past = new Date();
    var nowts = now.getTime();
    var pastDate = past.getDate() - 7;
    past.setDate(pastDate);
    var weekagots = past.getTime();

    this.activatedRoute
      .queryParams
      .subscribe(params => {
        console.log('params = ' + JSON.stringify(params))
        console.log('name = ' + params['name']);
        this.sensorName = params['name']
        this.sensorData = this.data[this.sensorName]
        let baseUrl = this.baseUrls[this.sensorName]
        for (var panel of this.sensorData) {
          let url = baseUrl + weekagots + '&to=' + nowts + '&panelId=' + panel['panelId'];
          panel.url = url;
        }
      });
  }
}
