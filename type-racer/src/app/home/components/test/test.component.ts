import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnDestroy {
  myUser: any = {};
  listUser = [];
  item: any = [];
  roomId: string;
  checkLogin = true;
  userId: string;
  para = 5;
  ready = false;
  checkLogout = true;
  constructor(private authService: AuthService, private db: AngularFireDatabase, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(p => {
      this.roomId = p.roomId;
    });
  }

  ngOnInit(): void {
    console.log('oninit');
    this.checkedLogin(() => {
      this.loadDb();
      // this.update();
    });

  }

  ngOnDestroy(): void {
    this.item.remove();
    this.checkLogout = false;
  }

  start(): void {
    this.myUser.ready = !this.myUser.ready;
    this.item.set(this.userId, this.myUser);
  }

  // update(): void {

  //   setTimeout(() => {
  //     this.myUser.process += 10;
  //     this.item.set(this.userId, this.myUser);
  //   }, 1000);

  //   setTimeout(() => {
  //     this.myUser.process -= 10;
  //     this.item.set(this.userId, this.myUser);
  //   }, 5000);

  // }

  loadDb(): void {
    this.item = this.db.list('room/' + this.roomId);
    this.item.valueChanges().subscribe(res => {
      if (this.checkLogout) {

        if (res.length === 0) {
          this.item.set(this.userId, this.myUser);
        } else {
          this.listUser = res;
          if (this.listUser.filter((e) => e.id === this.myUser.id).length === 0) {
            this.myUser.para = 10;
            this.item.set(this.userId, this.myUser);
          }

          if (this.listUser.filter((e) => e.ready === true).length === this.listUser.length) {
            this.ready = true;
          } else { this.ready = false; }
        }
      }
    });
  }

  checkedLogin(callback): void {
    this.authService.isAuth().subscribe((auth) => {
      if (auth) {
        this.myUser = {
          id: auth.email,
          name: auth.displayName,
          para: this.para,
          wpm: 0,
          time: 0,
          ready: false,
          process: 0
        };
        this.userId = auth.uid;
        callback();
      } else { this.checkLogin = false; }
    });
  }
}
