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
  paragraph: string[];
  index = 0;
  run = 10;

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
    this.splitWord();
    this.process();
  }

  // Kiểm tra nội dung nhập trùng khớp với văn bản đưa ra
  process() {
    let quoteInputElement = document.getElementById('typeInput');
    //hien thi para
    let quoteDisplay = document.getElementById('quote');

    quoteInputElement.addEventListener('input', () => {
      let arrayQuote = quoteDisplay.querySelectorAll('span');
      let arrayValue = $('#typeInput').val().split('');



      arrayQuote.forEach((characterSpan, index) => {
        let characterInput = arrayValue[index];

        // console.log('pro');

        if (characterInput == null) {
          characterSpan.style.color = '#000';
          characterSpan.style.backgroundColor = '#ececec';
        } else if (characterInput === characterSpan.innerText) {
          characterSpan.style.color = '#3bbb1b';
          characterSpan.style.backgroundColor = '#ececec';
        } else {
          characterSpan.style.backgroundColor = '#c52121';
        }
      });
    });
  }

  move(a) {
    a.value = null;
    a.placeholder = '';
    // let quoteDisplay = document.getElementById('quote');
    let inputValue = $('#typeInput').val();
    // let temp = document.getElementById('typeInput');
    // this.paragraph = quoteDisplay.innerText.split(' ');


    // temp.nodeValue = null;
    // console.log(this.paragraph[1])
    // console.log(this.paragraph.length)

    // console.log(quoteDisplay.innerText.split(' '))

    // for (let i = 0; i < this.paragraph.length; i++) {

    // }
    // console.log(a.split(' ')[index])

    // console.log(input.value.trim())
    if (this.index < this.paragraph.length) {
      if (inputValue.split(' ')[this.index] === this.paragraph[this.index]) {
        // console.log(inputValue.split(' ')[this.index])
        // this.paragraph = this.paragraph.filter(() => this.paragraph.shift());
        // console.log(this.paragraph)
        this.paragraph.shift();
        console.log(this.paragraph)
        this.index++;
        this.run += (90 / this.paragraph.length);
        $('.progress-bar').css("width", this.run + "%");
        $('.car-info').css("padding-left", this.run - 10 + "%")
      }
      else {
        console.log("Error!!!")
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

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
