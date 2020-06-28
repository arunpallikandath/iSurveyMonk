import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyAdminHomePage } from './survey-admin-home.page';

describe('SurveyAdminHomePage', () => {
  let component: SurveyAdminHomePage;
  let fixture: ComponentFixture<SurveyAdminHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyAdminHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyAdminHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
