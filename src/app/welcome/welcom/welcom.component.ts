import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcom',
  templateUrl: './welcom.component.html',
  styleUrls: ['./welcom.component.scss']
})
export class WelcomComponent implements OnInit {

  constructor(
        private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login();
  }

}
