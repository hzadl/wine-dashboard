import { Component, TemplateRef, ViewChild, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { icon, Marker } from 'leaflet';
import * as L from 'leaflet';
import 'style-loader!leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'style-loader!leaflet.markercluster/dist/MarkerCluster.css';
import 'style-loader!leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.awesome-markers';
import 'style-loader!leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';




@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./sensors.component.scss'],
  templateUrl: './sensors.component.html',
})

export class SensorsMapComponent {

  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: TemplateRef<HTMLElement>;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private zone: NgZone,
    private router: Router,
  ) {
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

  options = {
    layers: [
      L.tileLayer(
        'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: '...',
          maxZoom: 18,
        })
    ],
    zoom: 18,
    center: L.latLng(-34.411684, 140.600551)
  };


  onMapReady(map: L.Map) {
    this.http.get('assets/data/sensors-geo.json').subscribe((json: any) => {
      this.json = json;

      var markers = L.markerClusterGroup();

      const geoJsonLayer = L.geoJSON(this.json, {
        pointToLayer: function (feature, latlng) {
          var redMarker = L.AwesomeMarkers.icon({
            icon: feature.properties.markersymbol,
            markerColor: 'red',
            prefix: 'fa'
          });
          return L.marker(latlng, { icon: redMarker }).bindTooltip(feature.properties.name, { permanent: false });
        },
        onEachFeature:
          (feature, layer) => {
            layer.on("click", () => {
              console.log(feature.properties.name);
              if (feature.properties.name != 'Loxton Research Centre(Gateway)') {
                this.zone.run(async () => {
                  await this.router.navigate(['/pages/maps/sensordetails'], { queryParams: { name: feature.properties.name } });
                });
              }
            });
          }
      });

      markers.addLayer(geoJsonLayer);
      map.addLayer(markers);
    });

    this.http.get('assets/data/image_locations.json').subscribe((json: any) => {
      let self = this;
      var geoJsonLayer = L.geoJSON(json, {
        pointToLayer: function (feature, latlng) {
          let circleOptions = { radius: 2, opacity: 1, fill: true, fillOpacity: 1 };
          return L.circle(latlng, circleOptions);
        },
        onEachFeature: function (feature, layer) {
          layer.on("click", () => {
            console.log(feature.properties.id);
            self.zone.run(async () => {
              await self.router.navigate(['/pages/maps/imagedetails'], { queryParams: { name: feature.properties.id } });
            });
          });
        }
      });
      map.addLayer(geoJsonLayer);
    });

  }
}
