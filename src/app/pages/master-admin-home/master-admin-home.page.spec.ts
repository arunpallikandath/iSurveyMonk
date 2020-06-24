import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MasterAdminHomePage } from './master-admin-home.page';

describe('MasterAdminHomePage', () => {
  let component: MasterAdminHomePage;
  let fixture: ComponentFixture<MasterAdminHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAdminHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterAdminHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
