import { Component, OnInit } from '@angular/core';
import { CreGameService } from 'src/app/services/creGame.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  roomId: string;
  private creGameService: CreGameService
  constructor() { }

  ngOnInit(): void {
    console.log(this.creGameService.createId()
    .then( x => {
      console.log(x)
    })
    );

  }

  createGame() {
  }
}
