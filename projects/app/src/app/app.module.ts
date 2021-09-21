import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ColorPickerModule } from 'ngx-color-picker';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

registerLocaleData(en);

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        ColorPickerModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzSliderModule,
        NzFormModule,
        ReactiveFormsModule,
        NzInputModule,
    ],
  providers: [{ provide: NZ_I18N, useValue: en_US }]
})
export class AppModule {}
