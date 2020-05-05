import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  /* Permet de naviger vers la page précedente */
  goBack() {
    this._location.back();
  }

}
