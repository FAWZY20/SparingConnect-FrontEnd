import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucesseRegisterComponent } from './sucesse-register.component';

describe('SucesseRegisterComponent', () => {
  let component: SucesseRegisterComponent;
  let fixture: ComponentFixture<SucesseRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucesseRegisterComponent]
    });
    fixture = TestBed.createComponent(SucesseRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
