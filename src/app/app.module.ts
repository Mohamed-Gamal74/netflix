import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NvabarComponent } from './nvabar/nvabar.component';
import { FeaturesComponent } from './features/features.component';
import { FaqComponent } from './faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SigninComponent } from './signin/signin.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignupComponent } from './signup/signup.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './auth.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { TvDetailsComponent } from './tv-details/tv-details.component'
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    NvabarComponent,
    FeaturesComponent,
    FaqComponent,
    FooterComponent,
    WelcomePageComponent,
    LandingPageComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    MovieDetailsComponent,
    TvShowsComponent,
    TvDetailsComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    YouTubePlayerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
