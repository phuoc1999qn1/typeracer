import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

declare var $;

@Component({
  selector: 'app-type-screen',
  templateUrl: './type-screen.component.html',
  styleUrls: ['./type-screen.component.scss'],
})
export class TypeScreenComponent implements OnInit {
  currentInput: string;
  public flag: boolean;
  public action: boolean;

  public pastWords: string[] = [];
  public currentWord = '';
  public currentNext: string[] = [];
  public futureWords: string[] = [];

  public pastCharacter: string[] = [];
  public currentCharacter = '';
  public futureCharacter: string[] = [];

  paragraphLength: number;
  item: any[];
  random: number;
  charArray: string[];
  index = 0;
  runProcess = 10;
  runDinosaur = 0;
  checkStart = true;
  timeStart: number;
  wordLength: number;

  @ViewChild('quote', { static: true })
  private quote: ElementRef;

  constructor(public db: AngularFireDatabase, private render: Renderer2) {
  }

  ngOnInit(): void {
    $('#myTab a[href="#profile"]').tab('show'); // Select tab by name
    this.splitWord();

  }


  // Tách nội dung văn bản thành từng kí tự
  splitWord(): void {
    this.db
      .list('paragraph')
      .valueChanges()
      .subscribe((res) => {
        this.item = res;
        this.random = this.getRandomInt(this.item.length);
        const parts = this.item[this.random].split(' ');
        this.paragraphLength = parts.length;
        this.pastWords = [];
        this.currentWord = parts[0];
        this.futureWords = parts.splice(1);

        this.item = this.item[this.random].split('');
        this.pastCharacter = [];
        this.currentCharacter = this.item[0];
        this.futureCharacter = this.item;
        this.futureCharacter = this.futureCharacter.splice(1);
        // console.log(this.futureCharacter);

        // console.log(this.charArray)
        // var quote = this.item;
        // quote.forEach((chara) => {
        //   var charaSpan = document.createElement('span');
        //   charaSpan.innerText = chara;
        //   this.render.appendChild(this.quote.nativeElement, charaSpan);
        // });
      });
  }

  onInputChange(): void {
    if (this.currentWord === this.currentInput && this.futureWords.length === 0) {
      this.pastWords.push(this.currentWord);
      this.currentInput = '';
      this.currentWord = '';
      this.runProcess += 100 / this.paragraphLength;
      this.runDinosaur += 86 / this.paragraphLength;
    } else if (this.currentWord + ' ' === this.currentInput) {
      this.pastWords.push(this.currentWord);
      this.currentWord = this.futureWords[0];
      this.futureWords = this.futureWords.splice(1);
      this.currentInput = '';
      this.runProcess += 90 / this.paragraphLength;
      this.runDinosaur += 86 / this.paragraphLength;
      this.action = true;
    } else if (this.currentWord.startsWith(this.currentInput)) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }

  checkInput(): string {
    if (this.flag) {
      return '#f0a3a3';
    } else {
      return '';
    }
  }

  moveProcess(): string {
    if (this.action) {
      return this.runProcess + '%';
    } else {
      return;
    }
  }

  moveDinosaur(): string {
    if (this.action) {
      return this.runDinosaur + '%';
    } else {
      return;
    }
  }

  getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}


