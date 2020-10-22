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
  constructor(public db: AngularFireDatabase) {}

  ngOnInit(): void {
    
    this.getDB();
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

    this.splitWord()
  }

  splitWord() {
    
    var quoteDisplay = document.getElementById('quote')
    // var quote = this.item[0]
    // console.log(quote)
    // quote.split('').forEach(chara => {
    //   var charaSpan = document.createElement('span')
    //   charaSpan.innerText = chara
    //   quoteDisplay.appendChild(charaSpan)
    // })

  }

  getDB() {
    return this.db
      .list('paragraph')
      .valueChanges()
      .subscribe((res) => {
        this.item = res;
        console.log(this.item)
        // this.random = this.getRandomInt(this.item.length);
      });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
