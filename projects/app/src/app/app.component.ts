import { Component, ViewContainerRef } from '@angular/core';

import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { NzSliderValue } from 'ng-zorro-antd/slider';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-app',
  moduleId: 'src/app/app.component',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})
export class AppComponent {
  public toggle: boolean = false;

  public rgbaText: string = 'rgba(165, 26, 214, 0.2)';

  public arrayColors: any = {
    color1: '#2883e9',
    color2: '#e920e9',
    color3: 'rgb(255,245,0)',
    color4: 'rgb(236,64,64)',
    color5: 'rgba(45,208,45,1)'
  };

  public cmykValue: string = '';

  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);

  public form: FormGroup;
  public dropShadowParts: {
    h?: string,
    v?: string,
    blur?: string,
    color?: string,
  } = {
    h: '0',
    v: '0',
    blur: '0',
    color: '#000000',
  };

  constructor(public vcRef: ViewContainerRef, private cpService: ColorPickerService, private _fb: FormBuilder) {
    this.form = this._fb.group({
      shadow: ['0px 0px 0px #f200bd'],
    });
  }

  public get getInputValue(): string {
    return this.form.get('shadow').value;
  }

  public onEventLog(event: string, data: any): void {
    if (event === 'colorPickerOpen' || event === 'cpInputChange') {
      this._buildDropShadowString({});
    } else if (data?.color) {
      this._buildDropShadowString({
        color: data.color,
      });
    }/*
    if (event === 'cpDropShadowChange') {
      const input = {};
      input[event] = data;
      this._buildDropShadowString(input);
    }*/
  }

  public onChangeColor(color: string): void {
    console.log('Color changed:', color);
  }

  onSliderChange(elt: string, value: NzSliderValue) {
    const input = {};
    input[elt] = value;
    this._buildDropShadowString(input);
  }

  public get color(): string {
    const parts = (this.form.get('shadow')?.value ?? '')
        .trim()
        .split(' ')
        .map(part => part.trim());
    const color = parts[parts.length - 1];
    if (color?.startsWith('#')) {
      return color;
    }
    return '#000000';
  }

  private _buildDropShadowString(
      input: {h?: string, v?: string, blur?: string, color?: string}
  ) {
    let {h, v, blur, color} = input;
    const currentValue = (this.form.get('shadow')?.value ?? '')
        ?.trim()
        ?.split(' ')
        ?.map(part => part.replace('px', '').trim());

    const parts = [];

    h = h ?? currentValue[0] ?? parts[0] ?? '0';
    v = v ?? currentValue[1] ?? currentValue[0] ?? parts[1] ?? parts[0] ?? '0';
    blur = blur ?? currentValue[2] ?? parts[2] ?? '0';
    color = color ?? currentValue[3] ?? this.color ?? parts[3] ?? '#000000';

    this.dropShadowParts = {
      h, v, blur, color,
    };

    const shadow = `${h}px ${v}px ${blur}px ${color}`;
    this.form.get('shadow').patchValue(shadow);
  }
}
