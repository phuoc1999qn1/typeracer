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
  l1: number = 1;
  l2: number = 0;
  run: number;
  run1: number = 1;
  check = [];

  constructor(public db: AngularFireDatabase) {

  }
  ngOnInit(): void {
    $('#myTab a[href="#profile"]').tab('show'); // Select tab by name
    this.splitWord()
    setTimeout(() => {
      this.process();
    }, 3000);
  }

  // Kiểm tra nội dung nhập trùng khớp với văn bản đưa ra
  process() {
    let quoteInputElement = document.getElementById('typeInput');
    //hien thi para
    let quoteDisplay = document.getElementById('quote');

    this.run = (1 / quoteDisplay.innerText.split(' ').length * 100);

    quoteInputElement.addEventListener('input', () => {
      // cat para
      const arrQuote = quoteDisplay.innerText.split(' ')[this.l2];
      const arrQuoteSplit = arrQuote.split('');

      //lay input
      let arrayValue = $('#typeInput').val().split('');
      let temp = arrayValue.pop();


      if ((temp == '.' && arrQuoteSplit[arrayValue.length] == temp &&
        this.check.filter(x => x == false).length == 0)) {
        $('#quote').find(`span:nth-child(${this.l1 + arrayValue.length})`).css({ "color": "#3bbb1b", "background-color": "#ececec" })
        this.l1 += arrayValue.length + 1;
        this.l2++;
        $('#typeInput').val(null);
        $('#typeInput').attr("placeholder", null);
        this.run1 += this.run;
        $('.progress-bar').css("width", this.run1 + "%");
        $('.car-info').css("padding-left", this.run1 - 10 + "%")
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
