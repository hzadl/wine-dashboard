import { Component, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { icon, Marker } from 'leaflet';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'style-loader!leaflet.markercluster/dist/MarkerCluster.css';
import 'style-loader!leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.awesome-markers'
import 'style-loader!leaflet.awesome-markers/dist/leaflet.awesome-markers.css';



@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./image-map.component.scss'],
  template: `
    <nb-card>
      <nb-card-header>IoT sensors Maps</nb-card-header>
      <nb-card-body>
        <div leaflet [leafletOptions]="options" (leafletMapReady)="onMapReady($event)"></div>
      </nb-card-body>
    </nb-card>
  `,
})
export class ImageMapComponent {

  constructor(private http: HttpClient) {
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
  }

  map: L.Map;
  json;

  geojsonFeature = {
    "type": "FeatureCollection", "features": [
      { "type": "Feature", "geometry": { "type": "Polygon", "coordinates": [[[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]]] }, "properties": { "Id": 0, "PatchName": "19.CHA (P26)", "2016_12_18": 0.526925494454124, "2017_01_17": 0.541667466813868, "2017_01_27": 0.530416077375412, "2017_02_16": 0.484594320889675, "2017_02_26": 0.531752673784892, "2017_03_08": 0.509512550180609, "2017_03_18": 0.509891165928407, "2017_03_28": 0.394505681865143, "2017_05_07": 0.458055931690967, "2017_06_26": 0.334670463926864, "2017_07_06": 0.343305271683317, "2017_07_26": 0.358779073303396, "2017_09_24": 0.353928444241032, "2017_10_14": 0.444553923606873, "2017_12_13": 0.537051426280629, "2018_02_11": 0.481669410069784, "2018_03_03": 0.452441870804989, "2018_03_13": 0.451719400286675, "2018_03_23": 0.442636048793793, "2018_04_12": 0.451707183772867, "2018_04_22": 0.459589754812645, "2018_05_12": 0.43853144781156, "2018_06_21": 0.230464619849667, "2018_08_10": 0.342324931061629, "2018_08_20": 0.176132446753256, "2018_09_09": 0.354316599260677, "2018_09_19": 0.334850127407999, "2018_09_29": 0.375736251473427, "2018_10_29": 0.508400649283872, "2018_11_18": 0.549771894920956, "2019_02_16": 0.473692420215318, "2017_07_01": 0.347222530119347, "2017_07_11": 0.337703348018906, "2017_07_21": 0.360873099529382, "2017_08_20": 0.415281305349234, "2017_08_30": 0.461428030151309, "2017_09_29": 0.368114065311172, "2017_10_09": 0.193573055709853, "2017_10_29": 0.493933689594269, "2017_11_08": 0.535818650867, "2017_11_28": 0.54944977859656, "2018_01_17": 0.503505176667011, "2018_01_27": 0.487188016826456, "2018_02_06": 0.483667667706807, "2018_02_26": 0.462280931346344, "2018_03_08": 0.438438590909495, "2018_03_18": 0.381898585955302, "2018_03_28": 0.445809851902904, "2018_04_07": 0.464474469152364, "2018_04_17": 0.448543531605692, "2018_04_27": 0.471171673500177, "2018_06_06": 0.23187408953002, "2018_06_16": 0.227176540638461, "2018_07_06": 0.252122921654672, "2018_07_16": 0.272230090697606, "2018_08_25": 0.38287786091819, "2018_09_04": 0.404137248071757, "2018_09_14": 0.350758764689619, "2018_09_24": 0.378388014164838, "2018_10_04": 0.420360497633616, "2018_12_23": 0.492798076886119, "2019_01_12": 0.46114652391636, "2019_01_22": 0.4231050885988, "2019_02_01": 0.485015980041388, "2019_02_11": 0.289633711450028, "2019_02_21": 0.462836960861177 } },
    ]
  };
  jsonFeatures = JSON.parse(JSON.stringify(this.geojsonFeature));
  myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
  };

  options = {
    layers: [
      L.tileLayer(
        'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: '...',
          maxZoom: 18,
          minZoom: 16,
        })
    ],
    zoom: 16,
    center: L.latLng(-34.414424477119155, 140.60216635465622)
  };
  onMapReady(map: L.Map) {

    this.http.get('assets/data/image_locations.json').subscribe((json: any) => {
      console.log(json);
      this.json = json;

      var geoJsonLayer = L.geoJSON(this.json, {
        pointToLayer: function (feature, latlng) {
          var redMarker = L.AwesomeMarkers.icon({
            icon: 'camera',
            markerColor: 'red',
            prefix: 'fa'
          });
          return L.circle(latlng, { radius: 2, opacity: 1, fill: true, fillOpacity: 1 });
        },
        onEachFeature: function (feature, layer) {
          layer.on("click", () => {
            console.log(feature.properties.id);
            this.zone.run(async () => {
              await this.router.navigate(['/pages/maps/sensordetails'], { queryParams: { name: feature.properties.name } });
            });
          });
        }
      });
      map.addLayer(geoJsonLayer);
    });
  }
}
