import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare var $;

@Component({
  selector: 'app-type-screen',
  templateUrl: './type-screen.component.html',
  styleUrls: ['./type-screen.component.scss'],
})
export class TypeScreenComponent implements OnInit, OnDestroy {

  myUser: any = {};
  listUser = [];
  itemUser: any = [];
  roomId: string;
  userId: string;
  ready = false;
  checkLogin = true;
  checkLogout = true;
  checkPlay = true;
  currentInput: string;

  public flag: boolean;
  public action: boolean;
  public finished: boolean;

  public pastWords: string[] = [];
  public currentWord = '';
  public currentNext: string[] = [];
  public futureWords: string[] = [];

  public pastCharacter: string[] = [];
  public currentCharacter = '';
  public futureCharacter: string[] = [];

  timeLeft = 5;
  paragraphLength: number;
  item: any[];
  charArray: string[];
  index = 0;
  runProcess = 10;
  runDinosaur = 0;
  checkStart = true;
  timeStart: number;
  wordLength: number;

  @ViewChild('timeBlock', { static: true })
  private timeBlock: ElementRef;

  constructor(public db: AngularFireDatabase, private render: Renderer2, private authService: AuthService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(p => {
      this.roomId = p.roomId;
    });
    this.db.list('paragraph').valueChanges().subscribe((res) => {
      this.item = res;
    });
  }

  ngOnInit(): void {
    $('#myTab a[href="#profile"]').tab('show');
    this.checkedLogin(() => {
      this.loadDb(() => {
        if (this.checkPlay) {
          this.splitWord();
        }
      });
    });
  }


  ngOnDestroy(): void {
    this.itemUser.remove(this.userId);
    this.checkLogout = false;
  }

  startTimer(): void {
    let interval;
    interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  // Tách nội dung văn bản thành từng từ
  splitWord(): void {
    const parts = this.item[this.myUser.para].split(' ');
    this.paragraphLength = parts.length;
    this.pastWords = [];
    this.currentWord = parts[0];
    this.futureWords = parts.splice(1);


    // this.item = this.item[this.myUser.para].split('');
    // this.pastCharacter = [];
    // this.currentCharacter = this.item[0];
    // this.futureCharacter = this.item;
    // this.futureCharacter = this.futureCharacter.splice(1);
    // console.log(this.futureCharacter);

    // console.log(this.charArray)
    // var quote = this.item;
    // quote.forEach((chara) => {
    //   var charaSpan = document.createElement('span');
    //   charaSpan.innerText = chara;
    //   this.render.appendChild(this.quote.nativeElement, charaSpan);
    // });
  }

  onInputChange(): void {
    if (this.currentWord === this.currentInput && this.futureWords.length === 0) {
      this.pastWords.push(this.currentWord);
      this.currentInput = '';
      this.currentWord = '';
      this.runProcess += 90 / this.paragraphLength;
      this.myUser.runDinosaur += 86 / this.paragraphLength;
      this.itemUser.set(this.userId, this.myUser);
      this.finished = true;
    } else if (this.currentWord + ' ' === this.currentInput) {
      this.pastWords.push(this.currentWord);
      this.currentWord = this.futureWords[0];
      this.futureWords = this.futureWords.splice(1);
      this.currentInput = '';
      // this.myUser.runProcess += 90 / this.paragraphLength;
      this.runProcess += 90 / this.paragraphLength;

      // this.myUser.runDinosaur += 86 / this.paragraphLength;
      this.runDinosaur += 86 / this.paragraphLength;

      // this.itemUser.set(this.userId, this.myUser);
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
      // return this.myUser.runProcess + '%';
      return this.runProcess + '%';
    } else {
      return;
    }
  }

  moveDinosaur(): string {
    if (this.action) {
      // return this.myUser.runDinosaur + '%';
      return this.runDinosaur + '%';
    } else {
      return;
    }
  }


  RandomPara(): number {
    return Math.floor(Math.random() * Math.floor(this.item.length));
  }






























  // xu ly play game

  loadDb(callback): void {
    this.itemUser = this.db.list('room/' + this.roomId);
    this.itemUser.valueChanges().subscribe(res => {
      if (this.checkLogout) {
        if (res.length === 0) {
          this.myUser.para = this.RandomPara();
          this.itemUser.set(this.userId, this.myUser);
        } else {
          this.listUser = res;
          this.myUser.para = this.listUser[0].para;
          if (this.listUser.filter((e) => e.id === this.myUser.id).length === 0) {
            this.itemUser.set(this.userId, this.myUser);
          }
          if (this.listUser.filter((e) => e.ready === true).length === this.listUser.length) {
            this.ready = true;
          } else { this.ready = false; }
        }
        callback();
      }
    });
  }

  checkedLogin(callback): void {
    this.authService.isAuth().subscribe((auth) => {
      if (auth) {
        this.myUser = {
          id: auth.email,
          name: auth.displayName,
          para: 0,
          wpm: 0,
          time: 0,
          ready: false,
          runProcess: 10,
          runDinosaur: 0,
        };
        this.userId = auth.uid;
        callback();
      } else { this.checkLogin = false; }
    });
  }

  start(): void {
    this.myUser.ready = !this.myUser.ready;
    this.itemUser.set(this.userId, this.myUser);
  }
}


