import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  template: `
    <nav>
      <ul>
        <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
        <li><a routerLink="/diff-view" routerLinkActive="active">DiffView</a></li>
        <li><a routerLink="/hex-color-picker" routerLinkActive="active">HexColorPicker</a></li>
      </ul>
    </nav>
    <div class="container">
      <router-outlet />
    </div>
  `,
  styles: `
    nav ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #333;
    }

    nav li {
      float: left;
    }

    nav li a {
      display: block;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
    }

    nav li a:hover {
      background-color: #111;
    }

    nav li a.active {
      background-color: #04AA6D;
    }

    .container {
      margin: 1rem;
    }
  `
})
export class AppComponent {
}
