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
  //do dai word
  l1: number = 1;
  //thu tu cua word
  l2: number = 0;
  run: number;
  run1: number = 0;
  check = [];
  checkStart = true;
  timeStart: number;
  wordLength: number;

  constructor(public db: AngularFireDatabase) {

  }
  ngOnInit(): void {
    $('#myTab a[href="#profile"]').tab('show'); // Select tab by name
    this.splitWord()
    setTimeout(() => {
      this.process();
    }, 1);
  }

  // Kiểm tra nội dung nhập trùng khớp với văn bản đưa ra
  process() {
    let quoteInputElement = document.getElementById('typeInput');
    //hien thi para
    let quoteDisplay = document.getElementById('quote');
    quoteInputElement.addEventListener('input', () => {
      if (this.checkStart) {
        //do dai word
        this.wordLength = quoteDisplay.innerText.split(' ').length;
        this.run = (1 / (this.wordLength) * 100);
        console.log(this.wordLength);
        this.timeStart = Date.now();
        this.checkStart = false;
      }
      // console.log(timeStart)
      const characterLength = quoteDisplay.innerText.split('').length;
      // cat para
      const arrQuote = quoteDisplay.innerText.split(' ')[this.l2];
      //cat tung ki tu
      const arrQuoteSplit = arrQuote.split('');

      //lay input
      let arrayValue = $('#typeInput').val().split('');
      let temp = arrayValue.pop();
      // console.log(this.l2);
      if ((temp == '.' && arrQuoteSplit[arrayValue.length] == temp &&
        this.check.filter(x => x == false).length == 0) && this.wordLength === this.l2 + 1) {
        $('#quote').find(`span:nth-child(${this.l1 + arrayValue.length})`).css({ "color": "#3bbb1b", "background-color": "#ececec" })


        $('#typeInput').val(null);
        $('#typeInput').attr("placeholder", null);
        this.run1 += this.run;
        $('.progress-bar').css("width", this.run1 + "%");
        $('.car-info').css("padding-left", this.run1 - 10 + "%")


        const timeEnd = Date.now() - this.timeStart;
        const wpm = Math.ceil((5 * characterLength / Math.floor(timeEnd / 1000)));
        console.log(timeEnd/1000);
        console.log(5 * characterLength)
        alert(wpm + ' wpm');
      } else if ((temp == ' ' && arrQuoteSplit.length == arrayValue.length &&
        this.check.filter(x => x == false).length == 0)) {

        this.l1 += arrayValue.length + 1;
        this.l2++;
        this.run1 += this.run;

        $('#typeInput').val(null);
        $('#typeInput').attr("placeholder", null);
        $('.progress-bar').css("width", this.run1 + "%");
        $('.car-info').css("padding-left", this.run1 - 10 + "%")
      } else if (arrayValue.length < arrQuoteSplit.length) {
        if (arrQuoteSplit[arrayValue.length] == temp) {
          $('#typeInput').css("background-color", "white")
          this.check[arrayValue.length] = true;
          $('#quote').find(`span:nth-child(${this.l1 + arrayValue.length})`).css({ "color": "#3bbb1b", "background-color": "#ececec" })
        } else if (arrQuote[this.l1] != temp) {
          this.check[arrayValue.length] = false;
          $('#quote').find(`span:nth-child(${this.l1 + arrayValue.length})`).css({ "color": "#803333", "background-color": "#f0a3a3" })
          $('#typeInput').css("background-color", "#f0a3a3")
        }
      }
    });
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


