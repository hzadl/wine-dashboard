import { Component, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbWindowService } from '@nebular/theme';


import { icon, Marker } from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';


import * as L from 'leaflet-geotiff'
import * as plotty from 'leaflet-geotiff/leaflet-geotiff-plotty';

@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./ndvi.component.scss'],
  templateUrl: './ndvi.component.html',
})
export class NDVIMapComponent {

  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;
  customPlotty: any;

  dates = ['2016_12_18', '2017_01_17', '2017_01_27', '2017_02_16', '2017_02_26', '2017_03_08', '2017_03_18', '2017_03_28', '2017_05_07', '2017_06_26', '2017_07_01', '2017_07_06', '2017_07_11', '2017_07_21', '2017_07_26', '2017_08_20', '2017_08_30', '2017_09_24', '2017_09_29', '2017_10_09', '2017_10_14', '2017_10_29', '2017_11_08', '2017_11_28', '2017_12_13', '2018_01_17', '2018_01_27', '2018_02_06', '2018_02_11', '2018_02_26', '2018_03_03', '2018_03_08', '2018_03_13', '2018_03_18', '2018_03_23', '2018_03_28', '2018_04_07', '2018_04_12', '2018_04_17', '2018_04_22', '2018_04_27', '2018_05_12', '2018_06_06', '2018_06_16', '2018_06_21', '2018_07_06', '2018_07_16', '2018_08_10', '2018_08_20', '2018_08_25', '2018_09_04', '2018_09_09', '2018_09_14', '2018_09_19', '2018_09_24', '2018_09_29', '2018_10_04', '2018_10_29', '2018_11_18', '2018_12_23', '2019_01_12', '2019_01_22', '2019_02_01', '2019_02_11', '2019_02_16', '2019_02_21'];
  layer: any;

  options = {
    layers: [
      L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 15,
    minZoom: 15,
    center: L.latLng(-34.406686, 140.594238),
    maxBounds: L.latLngBounds(L.latLng(-34.427248, 140.514668), L.latLng(-34.389161, 140.672759))
  };
  map: L.Map

  legend = L.control({ position: 'bottomright' });

  constructor(private http: HttpClient, private windowService: NbWindowService) {
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;
    let grades = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
    let labels = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];

    this.customPlotty = new plotty.Plotty({ colorScale: 'jet' });
    this.layer = L.leafletGeotiff('assets/NDVI/2019_02_21.tif',
      {
        band: 0,
        displayMin: 0,
        displayMax: 30,
        name: 'Wind speed',
        colorScale: 'rainbow',
        clampLow: false,
        clampHigh: true,
        arrowSize: 20,
        renderer: new plotty.Plotty({ colorScale: 'jet' }),
      });

    this.legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 0.125, 0.375, 0.625, 0.875, 1],
        labels = [];

      let getColor = (d) => {
        return d > 0.875 ? '#800000' :
          d > 0.625 ? '#FA0000' :
            d > 0.375 ? '#FFFF00' :
              d > 0.125 ? '#05FFFF' :
                '#003CAA';
      }
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length - 1; i++) {
        div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
    };
  }

  onMapReady(map: L.Map) {
    this.layer.addTo(map);
    this.map = map;
  }

  onMenuItemSelected(event) {
    this.layer.remove();
    var name = 'assets/NDVI/' + event + '.tif'
    this.layer = L.leafletGeotiff(name,
      {
        band: 0,
        displayMin: 0,
        displayMax: 30,
        name: 'Wind speed',
        colorScale: 'rainbow',
        clampLow: false,
        clampHigh: true,
        arrowSize: 20,
        renderer: new plotty.Plotty({ colorScale: 'viridis' })
      });
    this.layer.addTo(this.map);
  }
}
