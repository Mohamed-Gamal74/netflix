import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent {
  movieDetail: any = [];
  relatedMovies: any = [];
  genres: number = 0;
  imgSrc = 'https://image.tmdb.org/t/p/w500';
  videoId: string = '';
  showVideo = false;

  constructor(
    private _MoviesService: MoviesService,
    private _ActiveRouter: ActivatedRoute,
    private _Router: Router
  ) {}

  customOptions: any = {
    loop: true,
    margin: 10,
    autoplay: true,
    responsiveClass: true,
    nav: false,
    dots: false,

    responsive: {
      0: {
        items: 2,
      },
      480: {
        items: 3,
      },
      940: {
        items: 7,
      },
    },
  };

  ngOnInit(): void {
    this._ActiveRouter.params.subscribe((data) => {
      this._MoviesService.getMovieDetails(data['id']).subscribe((data) => {
        this.movieDetail = data;
        this.genres = data.genres[0].id;
      });
    });

    this.genres = this._MoviesService.genere.value;
    this._MoviesService.getFilterdMovies(this.genres).subscribe((data) => {
      this.relatedMovies = data.results;
    });

    this._ActiveRouter.params.subscribe((data) => {
      this._MoviesService.getMovieVideos(data['id']).subscribe((data) => {
        this.videoId = data.results[0].key;
      });
    });
  }

  showVideoHandler() {
    this.showVideo = true;
  }

  closeVideo() {
    this.showVideo = false;
  }

  movieDetailsHandler(id: string) {
    this._Router.navigate([`/movie/${id}`]);
    window.scrollTo(0, 0);
  }
}
