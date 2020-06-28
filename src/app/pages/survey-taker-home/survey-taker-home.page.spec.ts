import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyTakerHomePage } from './survey-taker-home.page';

describe('SurveyTakerHomePage', () => {
  let component: SurveyTakerHomePage;
  let fixture: ComponentFixture<SurveyTakerHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyTakerHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyTakerHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
