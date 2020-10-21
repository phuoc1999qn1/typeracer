import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

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
    this.db
      .list('paragraph')
      .valueChanges()
      .subscribe((res) => {
        this.item = res;
        this.random = this.getRandomInt(this.item.length);
        console.log(this.random);
      });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
