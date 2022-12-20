import { Component } from '@angular/core';
import { TvService } from '../tv.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.css'],
})
export class TvDetailsComponent {
  tvDetail: any = [];
  imgSrc = 'https://image.tmdb.org/t/p/w500';
  videoId: string = '';
  showVideo = false;
  id: string = '';

  constructor(
    private _Tv: TvService,
    private _ActiveRouter: ActivatedRoute,
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
        items: 1,
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
    this.id = this._ActiveRouter.snapshot.params['id'];
    this._Tv.getTvDetails(this.id).subscribe((data) => {
      this.tvDetail = data;
    });

    this._Tv.getTvVideos(this.id).subscribe((data) => {
      this.videoId = data.results[0].key;
    });
  }

  showVideoHandler() {
    this.showVideo = true;
  }

  closeVideo() {
    this.showVideo = false;
  }
}
