import { Component, OnInit } from '@angular/core';

import { InputComponent } from '../input/input.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-bloco-um',
  standalone: true,
  imports: [InputComponent, RouterModule],
  templateUrl: './bloco-um.component.html',
  styleUrls: ['./bloco-um.component.css']
})
export class BlocoUmComponent{
  
}
