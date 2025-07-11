import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'lit-library/diff-view';
// import 'r2wc-library/diff-view';

@Component({
  selector: 'app-diff-view',
  imports: [],
  template: `
    <div class="actions">
      <button (click)="toggleViewMode()">Toogle View Mode</button>
      <button (click)="changeNewData()">Change New Data</button>
    </div>
    <diff-view 
      [oldData]="oldData" 
      [newData]="newData"
      [viewMode]="viewMode"
    />
  `,
  styles: `
    .actions {
      margin-bottom: 1rem;
      display: flex;
      gap: 0.5rem;
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DiffViewComponent {
  viewMode: 'split' | 'unified' = 'split';

  oldData = {
    id: 1,
    name: "Mario Rossi",
    email: "mario.rossi@example.com",
    isActive: true,
    roles: ["admin", "editor"],
    profile: {
      age: 36,
      city: "Milano",
      interests: ["musica", "programmazione", "viaggi"]
    }
  };

  newData = {
    id: 1,
    name: "Mario Verdi",
    email: "mario.verdi@example.com",
    isActive: true,
    roles: ["admin"],
    profile: {
      age: 36,
      city: "Milano",
      interests: ["musica", "programmazione", "viaggi"]
    }
  };

  toggleViewMode() {
    this.viewMode = this.viewMode === 'split' ? 'unified' : 'split';
  }

  changeNewData() {
    this.newData = {
      id: 1,
      name: "Mario Bianchi",
      email: "mario.bianchi@example.com",
      isActive: true,
      roles: ["admin"],
      profile: {
        age: 45,
        city: "Roma",
        interests: ["cucina"]
      }
    };
  }
}
