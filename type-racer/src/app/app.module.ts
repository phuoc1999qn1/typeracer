import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/components/header/header.component';
import { HomeComponent } from './home/components/home/home.component';
import { JoinGameComponent } from './home/components/join-game/join-game.component';
import { TypeScreenComponent } from './home/components/type-screen/type-screen.component';
import { HighScoreComponent } from './home/components/high-score/high-score.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    JoinGameComponent,
    TypeScreenComponent,
    HighScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
