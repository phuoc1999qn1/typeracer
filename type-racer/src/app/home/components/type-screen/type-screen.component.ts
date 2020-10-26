import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

declare var $;

@Component({
  selector: 'app-type-screen',
  templateUrl: './type-screen.component.html',
  styleUrls: ['./type-screen.component.scss'],
})
export class TypeScreenComponent implements OnInit {
  item: any[];
  itemRef : any;
  key : string;
  random: number;
  constructor(public db: AngularFireDatabase) {
  }
  ngOnInit(): void {
    this.itemRef = this.db.object('item');
    this.itemRef.snapshotChanges().subscribe((action) => {
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val());
    });

    $('#myTab a[href="#profile"]').tab('show'); // Select tab by name
    this.xuLy();
    this.splitWord();
  }

  xuLy() {
    let quoteInputElement = document.getElementById('typeInput');
    const quoteDisplay = document.getElementById('quote');

    quoteInputElement.addEventListener('input', () => {
      const arrayQuote = quoteDisplay.querySelectorAll('span');
      let arrayValue = $('#typeInput').val().split('');
      console.log(arrayValue);

      arrayQuote.forEach((characterSpan, index) => {
        let character = arrayValue[index];

        if (character == null) {
          characterSpan.style.color = '#000';
        } else if (character === characterSpan.innerText) {
          characterSpan.style.color = '#3bbb1b';
        } else {
          characterSpan.style.color = '#c52121';
        }
      });
    });
  }
  splitWord() {
    this.db
      .list('paragraph')
      .valueChanges()
      .subscribe((res) => {
        this.item = res;
        this.random = this.getRandomInt(this.item.length);
        var quoteDisplay = document.getElementById('quote');
        var quote = this.item[this.random];
        quote.split('').forEach((chara) => {
          var charaSpan = document.createElement('span');
          charaSpan.innerText = chara;
          quoteDisplay.appendChild(charaSpan);
        });
      });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
