import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  constructor(private themeService: NbThemeService) {
  }

  ngOnInit() {
    var divElement = document.getElementById('viz1560393840290');
    var vizElement = divElement.getElementsByTagName('object')[0];
    vizElement.style.width = '1055px'; vizElement.style.height = '850px';
    var scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);

    let s = 'script';
    let id = 'weatherwidget-io-js';
    var js, fjs = document.getElementsByTagName(s)[0];
    var element = document.getElementById('weatherwidget-io-js');
    js = document.createElement(s);
    js.id = id;
    js.src = 'https://weatherwidget.io/js/widget.min.js';
    fjs.parentNode.insertBefore(js, element);
  }
}
