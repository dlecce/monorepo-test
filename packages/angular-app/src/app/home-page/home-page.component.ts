import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [],
  template: `
    <p>
      home-page works!
    </p>
    <my-component first="Stencil" middle="'Don't call me a framework'" last="JS"></my-component>
  `,
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageComponent {

}
