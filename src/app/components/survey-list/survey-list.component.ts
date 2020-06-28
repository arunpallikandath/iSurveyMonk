import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../../shared/services/firestore.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
})
export class SurveyListComponent implements OnInit {

  constructor(private firestore: FirestoreService) { }

  ngOnInit() {}

}
