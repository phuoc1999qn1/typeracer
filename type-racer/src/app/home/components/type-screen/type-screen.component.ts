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
  random: number;
  constructor(public db: AngularFireDatabase) { }

  ngOnInit(): void {
    $('#myTab a[href="#profile"]').tab('show'); // Select tab by name
    this.process();
    this.splitWord();
    
  }

  process() {
    let quoteInputElement = document.getElementById('typeInput');
    let quoteDisplay = document.getElementById('quote');
    let flag = false;

    quoteInputElement.addEventListener('input', () => {
      let arrayQuote = quoteDisplay.querySelectorAll('span');
      let arrayValue = $('#typeInput').val().split('');

      arrayQuote.forEach((characterSpan, index) => {
        let character = arrayValue[index];

        if (character === ' ') {
          setInterval(this.move, 200)
        }

        if (character == null) {
          characterSpan.style.color = '#000';
          characterSpan.style.backgroundColor = '#ececec';
        } else if (character === characterSpan.innerText) {
          characterSpan.style.color = '#3bbb1b';
          characterSpan.style.backgroundColor = '#ececec';
        } else {
          characterSpan.style.backgroundColor = '#c52121';
        }
      });
    });
  }

  move() {
    let quoteDisplay = document.getElementById('quote');
    let move = document.getElementById('run')
    let max = quoteDisplay.innerText.length

    for (let i = 0; i <= max; i++) {
      move.style.paddingLeft = i + "px";
    }
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
