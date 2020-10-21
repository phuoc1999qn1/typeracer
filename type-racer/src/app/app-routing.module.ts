import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGameComponent } from './home/components/create-game/create-game.component';
import { HomeComponent } from './home/components/home/home.component';
import { JoinGameComponent } from './home/components/join-game/join-game.component';
import { TypeScreenComponent } from './home/components/type-screen/type-screen.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-game', component: CreateGameComponent },
  { path: 'join-game', component: JoinGameComponent },
  { path: 'type-screen', component: TypeScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
