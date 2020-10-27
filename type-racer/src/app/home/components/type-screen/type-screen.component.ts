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
  paragraph: string[];
  index = 0;
  run = 10;

  constructor(public db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    $('#myTab a[href="#profile"]').tab('show'); // Select tab by name
    this.splitWord();
  }

  /*-------- CODE TUAN ------------*/

  // Kiểm tra nội dung nhập trùng khớp với văn bản đưa ra
  // process() {
  // let quoteInputElement = document.getElementById('typeInput');
  //   //hien thi para
  //   let quoteDisplay = document.getElementById('quote');

  //   quoteInputElement.addEventListener('input', () => {
  //     let arrayQuote = quoteDisplay.querySelectorAll('span');
  //     let arrayValue = $('#typeInput').val().split('');

  //     arrayQuote.forEach((characterSpan, index) => {
  //       let characterInput = arrayValue[index];

  //       // console.log('pro');

  //       if (characterInput == null) {
  //         characterSpan.style.color = '#000';
  //         characterSpan.style.backgroundColor = '#ececec';
  //       } else if (characterInput === characterSpan.innerText) {
  //         characterSpan.style.color = '#3bbb1b';
  //         characterSpan.style.backgroundColor = '#ececec';
  //       } else {
  //         characterSpan.style.backgroundColor = '#c52121';
  //       }
  //     });
  //   });
  // }

  color(input) {
    let quoteDisplay = document.getElementById('quote');
    let arrayQuote = quoteDisplay.querySelectorAll('span');
    let arrayValue = $('#typeInput').val().split('');

    arrayQuote.forEach((characterSpan, index) => {
      // let characterInput = arrayValue[index];
      console.log(characterSpan.innerText)

      if (input.value == null) {
        characterSpan.style.color = '#000';
        characterSpan.style.backgroundColor = '#ececec';
      } else if (input.value === characterSpan.innerText) {
        characterSpan.style.color = '#3bbb1b';
        characterSpan.style.backgroundColor = '#ececec';
      } else {
        characterSpan.style.backgroundColor = '#c52121';
      }
    })
    // console.log(input.value)

    // this.paragraph = quoteDisplay.innerText.split('');
    // console.log(this.paragraph)
  }

move(input) {
  let quoteDisplay = document.getElementById('quote');
  this.paragraph = quoteDisplay.innerText.split(' ');

  if (this.index < this.paragraph.length) {
    if (input.value.trim() === this.paragraph[this.index]) {
      console.log(this.paragraph[this.index]);
      input.value = '';
      this.index++;
      this.run += (90 / this.paragraph.length);
      $('.progress-bar').css("width", this.run + "%");
      $('.car-info').css("padding-left", this.run - 10 + "%");
    }
    else {
      console.log("Error!!!");
    }
  }
}

// Tách nội dung văn bản thành từng kí tự
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

/*-------- END CODE TUAN ------------*/

getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
}
