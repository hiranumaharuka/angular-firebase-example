import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomComponent } from './welcom/welcom.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [WelcomComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MatButtonModule
  ]
})
export class WelcomeModule { }
