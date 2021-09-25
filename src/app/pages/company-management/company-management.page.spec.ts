import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompanyManagementPage } from './company-management.page';

describe('CompanyManagementPage', () => {
  let component: CompanyManagementPage;
  let fixture: ComponentFixture<CompanyManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
