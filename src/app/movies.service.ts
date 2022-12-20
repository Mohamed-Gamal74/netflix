import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  genere = new BehaviorSubject(0);
  movieId = new BehaviorSubject(0);
  baseUrl = 'https://api.themoviedb.org/3';
  apiKey = '3976adc6b25dc878c453440b7474c313';

  constructor(private _http: HttpClient) {}

  getMovies(type: string): Observable<any> {
    return this._http.get(
      `${this.baseUrl}/trending/${type}/week?api_key=${this.apiKey}`
    );
  }

  getFilterdMovies(genre: number): Observable<any> {
    return this._http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${
        genre || 28
      }`
    );
  }

  getMovieDetails(movieId: string): Observable<any> {
    return this._http.get(
      `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=en-US`
    );
  }

  getMovieVideos(movieId: string): Observable<any> {
    return this._http.get(
      `${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}&language=en-US`
    );
  }

  searchMovie(query: string, type: string): Observable<any> {
    return this._http.get(
      `${this.baseUrl}/search/${type}?api_key=${this.apiKey}&query=${query}`
    );
  }
}
