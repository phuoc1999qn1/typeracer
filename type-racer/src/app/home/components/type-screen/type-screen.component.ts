import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

declare var $;

declare var $;
@Component({
  selector: 'app-type-screen',
  templateUrl: './type-screen.component.html',
  styleUrls: ['./type-screen.component.scss'],
})
export class TypeScreenComponent implements OnInit {
  item: any[];
  random: number;
  constructor(public db: AngularFireDatabase) {}
    }
  ]

  constructor() { }

  ngOnInit(): void {
    this.splitWord()

    $('#myTab a[href="#profile"]').tab('show'); // Select tab by name
    this.getDB();
    var quoteInputElement = document.getElementById('typeInput')
    const quoteDisplay = document.getElementById('quote')
    
    quoteInputElement.addEventListener('input', () => {
      const arrayQuote = quoteDisplay.querySelectorAll('span')
      var arrayValue = $('#typeInput').val().split('')
      console.log(arrayValue)

      arrayQuote.forEach((characterSpan, index) => {
        var character = arrayValue[index]

        if (character == null) {
          characterSpan.style.color = "#000"
        } else if (character === characterSpan.innerText) {
          characterSpan.style.color = "#3bbb1b";
           
        } else if (character !== characterSpan.innerText) {
          characterSpan.style.color = "#c52121"
        } else {
          characterSpan.style.color = "#000"
        }
      })
    })
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
