import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {

  link: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goto(): void {
    this.router.navigate(['/type-screen'], { queryParams: { roomId: '-' + this.link } });
  }

}
