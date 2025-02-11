import { Component } from '@angular/core';
import { BlocoUmComponent } from '../bloco-um/bloco-um.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rastreia-input',
  imports: [ RouterModule, BlocoUmComponent],
  templateUrl: './rastreia-input.component.html',
  styleUrl: './rastreia-input.component.css'
})
export class RastreiaInputComponent {

}
