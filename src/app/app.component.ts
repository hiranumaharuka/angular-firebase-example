// この中で使う機能はすべてimportする必要がある
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

// このコンポーネントを扱うにあたってどういうタグで扱えるのか
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// export以下はこのコンポーネントの本体
export class AppComponent {
  // プロパティ
  // 自分を呼び出したコンポーネントなどが使える関数
  user$ = this.authService.afUser$;

  // AuthServiceを呼び出す
  // このクラス内で使う機能を定義
  constructor(
    private authService: AuthService
  ) {}
  title = 'dog-hunting';

// メソッド（機能）
// 自分を呼び出したコンポーネントまたは自分のクラス内でが使える関数
  logout() {
    this.authService.logout();
  }
}
