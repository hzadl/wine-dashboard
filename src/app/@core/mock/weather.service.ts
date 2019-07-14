import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable()
export class WeatherService {

    key = '0f08a7662b90a92df3d89c4818588b28'
  constructor(public http: HttpClient) {
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<Array<any>>  {
    const dataSubject = new Subject<Array<any>>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=`+this.key)
      .subscribe((weather: any) => {
        dataSubject.next(weather.list);
      });
    return dataSubject;
  }

  getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
    const dataSub = new Subject<any>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=`+this.key)
      .subscribe((data) => {
        dataSub.next(data);
      }, (err) => {
        console.log(err);
      });
    return dataSub;
  }

//   getCitiesWeathersByNames(cities: Array<string>, metric: 'metric' | 'imperial' = 'metric'): Subject<any> {
//     const citiesSubject = new Subject();
//     cities.forEach((city) => {
//       citiesSubject.next(this.http.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=952d6b1a52fe15a7b901720074680562`));
//     });
//     return citiesSubject;
//   }

  getWeatherState(city: string): Subject<string> {
    const dataSubject = new Subject<string>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=`+this.key)
      .subscribe((data) => {
        dataSubject.next(data['weather'][0].main);
      });
    return dataSubject;
  }

  getCurrentTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=`+this.key)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Number(weather.main.temp)));
      });
    return dataSubject;
  }


  getCurrentHum(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=`+this.key)
      .subscribe((weather: any) => {
        console.log(weather);
        dataSubject.next(weather.main.humidity);
      });
    return dataSubject;
  }


  getCurrentWind(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
    const dataSubject = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=`+this.key)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Math.round(weather.wind.speed)));
      });
    return dataSubject;
  }


  getMaxTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
    const dataSubject = new Subject<number>();
    let max: number;
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=`+this.key)
      .subscribe((weather: any) => {
        max = weather.list[0].main.temp;
        let count = 0;
        weather.list.forEach((value) => {
            if(count < 8){
                if (max < value.main.temp) {
                    max = value.main.temp;
                  }
            }
            count += 1;
        });
        dataSubject.next(Math.round(max));
      });
    return dataSubject;
  }

  getMinTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
    const dataSubject = new Subject<number>();
    let min: number;
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=`+this.key)
      .subscribe((weather: any) => {
        min = weather.list[0].main.temp;
        let count = 0;
        weather.list.forEach((value) => {
            if(count < 8){
                if (min > value.main.temp) {
                    min = value.main.temp;
                  }
            }
            count += 1;
        });
        dataSubject.next(Math.round(min));
      });
    return dataSubject;
  }


}