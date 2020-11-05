import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  roomId: string;
  constructor(private db: AngularFireDatabase, private router: Router) { }

  ngOnInit(): void {
    this.roomId = this.db.createPushId();
  }
  creGame(): void {
    this.router.navigate(['/type-screen'], { queryParams: { roomId: this.roomId } });
  }

}
