import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TvService {
  genere = new BehaviorSubject(0);
  tvId = new BehaviorSubject(0);
  baseUrl = 'https://api.themoviedb.org/3';
  apiKey = '3976adc6b25dc878c453440b7474c313';

  constructor(private _http: HttpClient) {}

  getNetflixOriginals(): Observable<any> {
    return this._http.get(`${this.baseUrl}/discover/tv?api_key=${this.apiKey}`);
  }


  getTvDetails(id: string): Observable<any> {
    return this._http.get(
      `${this.baseUrl}/tv/${id}?api_key=${this.apiKey}&language=en-US`
    );
  }

  getTvVideos(id: string): Observable<any> {
    return this._http.get(
      `${this.baseUrl}/tv/${id}/videos?api_key=${this.apiKey}&language=en-US`
    );
  }
}
