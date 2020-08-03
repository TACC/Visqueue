import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ExploreService } from './explore.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  providers : [ExploreService]
})
export class ExploreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
