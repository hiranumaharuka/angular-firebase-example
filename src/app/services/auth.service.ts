import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// このサービスがアプリのどこからでも使えるように
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * 今のログイン状態を取得する
   * Observableはつねに最新の値が入ってくる箱
   */
  afUser$: Observable<User> = this.afAuth.user;
  uid: string;
  gitHubId: number;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    /**
     * 受け取った値をconsole,logで表示する
     */
    this.afUser$.subscribe(user => {
      // ログインするたびに自分のGitHubidがauthserviceに乗ってくる
      // 頭に+をつけると数字になる
      this.gitHubId = +user.providerData[0].uid;
      // if文の省略形
      this.uid = user && user.uid;

    });
   }
/**
 * GithubAuthProviderをgoogleとかfacebookに変えられる
 * 要firebaseでの設定
 * signInWithPopupは認証画面がpopupとしてでてくる
 * signInWithRredireceにも設定できる
 */
  login() {
    this.afAuth.auth.signInWithPopup(
      new auth.GithubAuthProvider()
    ).then(() => {
      this.snackBar.open('ようこそGitPetへ', null, {
        duration: 2000
      });
      this.router.navigateByUrl('/create');
    });
  }
/**
 * ログアウトしたらwelcomeページに飛ぶように
 */
  logout()　{
    this.afAuth.auth.signOut().then(() => {
      this.snackBar.open('ログアウトしました', null, {
        duration: 2000
      });
    });
    this.router.navigateByUrl('/welcome');
  }
}
