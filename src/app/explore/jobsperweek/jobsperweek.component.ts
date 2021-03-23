import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rack } from 'src/app/models/rack';
import { ExploreService } from '../explore.service';

@Component({
  selector: 'app-jobsperweek',
  templateUrl: './jobsperweek.component.html',
  styleUrls: ['./jobsperweek.component.scss']
})
export class JobsperweekComponent implements OnInit {

  constructor(
      private explorService : ExploreService,
      private rout          : ActivatedRoute) { }

  ngOnInit(): void 
  {
  }

  retrieveData( data : Rack )
  {
      console.log( data );
  }

}
