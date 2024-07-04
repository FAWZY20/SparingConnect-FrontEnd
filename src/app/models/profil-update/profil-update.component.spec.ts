import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilUpdateComponent } from './profil-update.component';

describe('ProfilUpdateComponent', () => {
  let component: ProfilUpdateComponent;
  let fixture: ComponentFixture<ProfilUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilUpdateComponent]
    });
    fixture = TestBed.createComponent(ProfilUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
