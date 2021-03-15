import { Component, OnInit } from '@angular/core';
import { ExploreService } from '../explore.service';

@Component({
  selector: 'app-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.scss']
})
export class Top10Component implements OnInit {

  constructor(private exploreService : ExploreService ) { }

  ngOnInit(): void 
  {
      
  }

}
