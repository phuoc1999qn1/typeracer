import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { auth } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService,
  ) {
   }

  checkLogin = true;
  user: any = {
    name: '',
    ava: '',
  };

  ngOnInit(): void {
    this.checkedLogin();
  }

  checkedLogin() {
    this.authService.isAuth().subscribe((auth) => {
      if (auth) {
        this.user.name = auth.displayName;
        this.user.ava = auth.photoURL;
      } else this.checkLogin = false;
    });
  }

  onGoogle() {
    // this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    return new Promise<any>((resolve, reject) => {
      let provider = new auth.GoogleAuthProvider();
      this.afAuth.signInWithPopup(provider).then(
        (res) => {
          resolve(res);
          this.user.name = res.user.displayName;
          this.user.ava = res.user.photoURL;
          this.checkLogin = true;
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  onLogout() {
    this.afAuth.signOut();
  }
}
