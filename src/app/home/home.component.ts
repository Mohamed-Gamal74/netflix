import { OnInit, Component, OnDestroy } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  trendingMovies: any = [];
  filterMovies: any = [];
  imgSrc = 'https://image.tmdb.org/t/p/w500';
  activeBtn = false;

  searchInput: string = '';

  constructor(private _MoviesService: MoviesService, private _Router: Router) {}

  ngOnInit(): void {
    this._MoviesService.getMovies('movie').subscribe((data) => {
      this.trendingMovies = data.results.slice(0, 10);
    });

    this._MoviesService.genere.subscribe((data) => {
      this._MoviesService.getFilterdMovies(data).subscribe((data) => {
        this.filterMovies = data.results;
      });
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

  clickHandler(event: any) {
    this._MoviesService.genere.next(event.target.id);

    document.querySelectorAll('.btn').forEach((btn) => {
      btn.classList.remove('activeBtn');
      if (btn.id === event.target.id) {
        btn.classList.add('activeBtn');
      }
    });
  }

  movieDetailsHandler(id: number, genere: number) {
    this._Router.navigate([`/movie/${id}`]);
    this._MoviesService.genere.next(genere);
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this._MoviesService.genere.next(0);
    }, 1000);
  }

  searchHandler() {
    if (this.searchInput.length > 0) {
      this._MoviesService
        .searchMovie(this.searchInput, 'movie')
        .subscribe((data) => {
          this._Router.navigate([`/movie/${data.results[0].id}`]);
        });
    }
  }
}
