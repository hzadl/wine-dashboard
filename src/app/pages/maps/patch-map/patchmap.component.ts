import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'style-loader!leaflet/dist/leaflet.css';
import * as L from 'leaflet-geotiff';

@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./patchmap.component.scss'],
  templateUrl: './patchmap.component.html',
})
export class PatchMapComponent {
  dates = ['2016_12_18', '2017_01_17', '2017_01_27', '2017_02_16', '2017_02_26', '2017_03_08', '2017_03_18', '2017_03_28', '2017_05_07', '2017_06_26', '2017_07_01', '2017_07_06', '2017_07_11', '2017_07_21', '2017_07_26', '2017_08_20', '2017_08_30', '2017_09_24', '2017_09_29', '2017_10_09', '2017_10_14', '2017_10_29', '2017_11_08', '2017_11_28', '2017_12_13', '2018_01_17', '2018_01_27', '2018_02_06', '2018_02_11', '2018_02_26', '2018_03_03', '2018_03_08', '2018_03_13', '2018_03_18', '2018_03_23', '2018_03_28', '2018_04_07', '2018_04_12', '2018_04_17', '2018_04_22', '2018_04_27', '2018_05_12', '2018_06_06', '2018_06_16', '2018_06_21', '2018_07_06', '2018_07_16', '2018_08_10', '2018_08_20', '2018_08_25', '2018_09_04', '2018_09_09', '2018_09_14', '2018_09_19', '2018_09_24', '2018_09_29', '2018_10_04', '2018_10_29', '2018_11_18', '2018_12_23', '2019_01_12', '2019_01_22', '2019_02_01', '2019_02_11', '2019_02_16', '2019_02_21'];
  currentDate = '2019_02_21'
  map: L.Map;
  json;
  info = L.control();
  legend = L.control({ position: 'bottomright' });
  options = {
    layers: [
      L.tileLayer(
        'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: '...',
          maxZoom: 18,
        })
    ],
    zoom: 16,
    center: L.latLng(-34.415050, 140.602208)
  };
  geojson;

  constructor(private http: HttpClient) {

  }

  getOptions(map) {
    let info = this.info;
    let self = this;

    let style = (feature) => {
      let getColor = (d) => {
        return d > 0.7 ? '#800000' :
          d > 0.6 ? '#FA0000' :
            d > 0.4 ? '#FFFF00' :
              d > 0.3 ? '#05FFFF' :
                d > 0.2 ? '#003CAA' :
                  '#000083';
      }
      let color = getColor(feature.properties[this.currentDate]);
      return {
        fillColor: color,
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };
    }

    function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      info.update(layer.feature.properties);
    }
    function resetHighlight(e) {
      self.geojson.resetStyle(e.target);
      info.update();
    }
    function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: highlightFeature
      });
    }
    return { style: style, onEachFeature: onEachFeature };
  }

  onMapReady(map: L.Map) {
    let self = this;
    this.map = map;
    this.info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };
    this.legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
        gradeNames = ['Very low vigour', 'Low vigour', 'Moderate vigour', 'High vigour', 'Very high vigour', 'Extremely high vigour'],
        labels = ['#000083', '#003CAA', '#05FFFF', '#FFFF00', '#FA0000', '#800000'];
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < gradeNames.length; i++) {
        div.innerHTML +=
          '<i style="background:' + labels[gradeNames.length - 1 - i] + '"></i> ' +
          gradeNames[gradeNames.length - 1 - i] + '<br>';
      }
      return div;
    };
    // method that we will use to update the control based on feature properties passed
    this.info.update = function (props) {
      this._div.innerHTML = (props ?
        '<h4>' + props.PatchName + '</h4>' + '<b>NDVI</b><br />' + props[self.currentDate].toFixed(3)
        : 'Hover over a patch');
    };
    this.info.addTo(map);
    this.legend.addTo(map);
    this.http.get('assets/data/patches.json').subscribe((json: any) => {
      let self = this;
      this.json = json;
      this.geojson = L.geoJSON(this.json, self.getOptions(map)).addTo(map);
    });
  }

  onMenuItemSelected(event) {
    this.currentDate = event;
    this.geojson.remove();
    this.geojson = L.geoJSON(this.json, this.getOptions(this.map)).addTo(this.map);
  }
}
