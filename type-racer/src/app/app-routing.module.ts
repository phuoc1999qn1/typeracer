import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { JoinGameComponent } from './home/components/join-game/join-game.component';
import { TypeScreenComponent } from './home/components/type-screen/type-screen.component';
import { HighScoreComponent } from './home/components/high-score/high-score.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'join-game', component: JoinGameComponent },
  { path: 'type-screen', component: TypeScreenComponent },
  { path: 'high-score', component: HighScoreComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
