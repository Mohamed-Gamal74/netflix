import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import { TvService } from '../tv.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css'],
})
export class TvShowsComponent {
  trendingTv: any = [];
  netflixOriginal: any = [];
  tvPopular: any = [];
  imgSrc = 'https://image.tmdb.org/t/p/w500';
  activeBtn = false;
  searchInput: string = '';


  constructor(
    private _MoviesService: MoviesService,
    private _Router: Router,
    private _Tv: TvService
  ) {}

  ngOnInit(): void {
    this._MoviesService.getMovies('tv').subscribe((data) => {
      this.trendingTv = data.results.slice(0, 10);
      console.log(this.trendingTv);
    });

    this._Tv.getNetflixOriginals().subscribe((data) => {
      this.netflixOriginal = data.results.slice(0, 10);
      this.tvPopular = data.results.slice(10, 20);
    });

  }

  customOptions: any = {
    loop: true,
    margin: 10,
    autoplay: true,
    responsiveClass: true,
    nav: false,
    dots: false,

    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
  };

  tvDetailsHandler(id: number) {
    this._Router.navigate([`/tv/${id}`]);
  }

  searchHandler() {
    if (this.searchInput.length > 0) {
      this._MoviesService
        .searchMovie(this.searchInput, 'tv')
        .subscribe((data) => {
          this._Router.navigate([`/tv/${data.results[0].id}`]);
        });
    }
  }
}
