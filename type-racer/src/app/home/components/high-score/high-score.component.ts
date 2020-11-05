import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-high-score',
  templateUrl: './high-score.component.html',
  styleUrls: ['./high-score.component.scss'],
})
export class HighScoreComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    $('#myTab a[href="#profile"]').tab('show'); // Select tab by name
  }
}
