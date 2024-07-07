import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSettingComponent } from './header-setting.component';

describe('HeaderSettingComponent', () => {
  let component: HeaderSettingComponent;
  let fixture: ComponentFixture<HeaderSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderSettingComponent]
    });
    fixture = TestBed.createComponent(HeaderSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
