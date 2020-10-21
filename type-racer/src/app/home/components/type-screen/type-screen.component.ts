import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { __awaiter } from 'tslib';

@Component({
  selector: 'app-type-screen',
  templateUrl: './type-screen.component.html',
  styleUrls: ['./type-screen.component.scss'],
})
export class TypeScreenComponent implements OnInit {
  item: any[];
  random: number;
  constructor(public db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.getDB();
  }

  getDB() {
    return this.db
      .list('paragraph')
      .valueChanges()
      .subscribe((res) => {
        this.item = res;
        this.random = this.getRandomInt(this.item.length);
      });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
