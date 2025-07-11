import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'lit-library/hex-color-picker';
// import 'r2wc-library/hex-color-picker';

@Component({
  selector: 'app-hex-color-picker',
  imports: [],
  template: `
    <hex-color-picker 
      [color]="initialColor" 
      (colorChange)="onColorChange($event)"
    />
    <pre class="selected-color">Selected color: {{selectedColor}}</pre>
  `,
  styles: `
    .selected-color {
      margin-top: 1rem;
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HexColorPickerComponent {
  initialColor = '#ff0000';
  selectedColor = this.initialColor;

  onColorChange(event: Event) {
    this.selectedColor = (event as CustomEvent).detail;
    console.log('color changed!', this.selectedColor);
  }
}
