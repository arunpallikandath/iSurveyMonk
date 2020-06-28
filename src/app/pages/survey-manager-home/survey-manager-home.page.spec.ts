import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyManagerHomePage } from './survey-manager-home.page';

describe('SurveyManagerHomePage', () => {
  let component: SurveyManagerHomePage;
  let fixture: ComponentFixture<SurveyManagerHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyManagerHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyManagerHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
