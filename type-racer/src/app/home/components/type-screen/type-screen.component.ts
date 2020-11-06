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
  x = 'Start';
  myUser: any = {};
  listUser = [];
  itemUser: any = [];
  roomId: string;
  userId: string;
  ready = false;
  checkLogin = true;
  checkLogout = true;
  checkPlay = true;
  checkPlayGame = true;
  currentInput: '';

  public flag: boolean;
  public action: boolean;
  public color: boolean;

  public pastWords: string[] = [];
  public currentWord = '';
  public currentNext: string[] = [];
  public futureWords: string[] = [];

  public pastCharacter: string[] = [];
  public currentCharacter = '';
  public futureCharacter: string[] = [];

  timeLeft = 2;
  paragraphLength: number;
  item: any[];
  charArray: string[];
  index = 0;
  runProcess = 0;
  runDinosaur = 0;
  checkStart = true;
  timeStart: number;
  wordLength: number;

  @ViewChild('timeBlock', { static: true })
  private timeBlock: ElementRef;

  @ViewChild('btnStart', { static: true })
  private btnStart: ElementRef;

  @ViewChild('inputStyle', { static: true })
  private inputStyle: ElementRef;

  constructor(public db: AngularFireDatabase, private render: Renderer2, private authService: AuthService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(p => {
      this.roomId = p.roomId;
    });
    this.db.list('paragraph').valueChanges().subscribe((res) => {
      this.item = res;
    });
  }

  ngOnInit(): void {
    // console.log('onit');
    $('#myTab a[href="#profile"]').tab('show');
    this.render.setAttribute(this.inputStyle.nativeElement, 'disabled', 'true');
    this.checkedLogin(() => {
      this.loadDb(() => {
        if (this.checkPlay) {
          this.splitWord();
          this.checkPlay = false;
        }
      });
    });
  }


  ngOnDestroy(): void {
    this.itemUser.remove(this.userId);
    this.checkLogout = false;
    // console.log('destroy');
  }

  startTimer(): void {
    let interval;
    this.render.setStyle(this.timeBlock.nativeElement, 'display', 'block');
    interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.render.setStyle(this.timeBlock.nativeElement, 'display', 'none');
        this.render.setStyle(this.btnStart.nativeElement, 'display', 'none');
        this.render.removeAttribute(this.inputStyle.nativeElement, 'disabled');
        this.inputStyle.nativeElement.focus();
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
  }

  onInputChange(): void {
    if (this.currentWord === this.currentInput && this.futureWords.length === 0) {
      this.pastWords.push(this.currentWord);
      this.currentInput = '';
      this.currentWord = '';
      this.runProcess += 90 / this.paragraphLength;
      this.myUser.runDinosaur += 86 / this.paragraphLength;
      this.itemUser.set(this.userId, this.myUser);
      this.render.setAttribute(this.inputStyle.nativeElement, 'disabled', 'true');
    } else if (this.currentWord + ' ' === this.currentInput) {
      this.pastWords.push(this.currentWord);
      this.currentWord = this.futureWords[0];
      this.futureWords = this.futureWords.splice(1);
      this.currentInput = '';
      this.myUser.runProcess += 100 / this.paragraphLength;
      this.myUser.runDinosaur += 86 / this.paragraphLength;
      this.itemUser.set(this.userId, this.myUser);
      this.action = true;
      this.color = true;
    } else if (this.currentWord.startsWith(this.currentInput)) {
      this.flag = false;
      this.color = true;
    } else {
      this.color = false;
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

  checkStyleParagraph(): string {
    if (this.currentInput === null) {
      return '#000';
    } else if (!this.color) {
      return '#f0a3a3';
    } else {
      return '#3bbb1b';
    }
  }

  styleParseDinosaur(runP): string {
    return 'padding-left:' + runP + '%';
  }

  styleParseProcess(runD): string {
    return 'width:' + runD + '%';
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
          // console.log(1);
          this.itemUser.set(this.userId, this.myUser);
        } else {
          this.listUser = res;
          this.myUser.para = this.listUser[0].para;
          if (this.listUser.filter((e) => e.id === this.myUser.id).length === 0) {
            this.itemUser.set(this.userId, this.myUser);
            // console.log(2);
          }
          if (this.listUser.filter((e) => e.ready === true).length === this.listUser.length) {
            this.ready = true;
            if (this.checkPlayGame) {
              this.startTimer();
              this.checkPlayGame = false;
            }
          } else { this.ready = false; }
        }
        // console.log(this.listUser);
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
    if (this.myUser.ready) { this.x = 'Ready'; }
    else { this.x = 'Start'; }
    this.itemUser.set(this.userId, this.myUser);
  }
}


