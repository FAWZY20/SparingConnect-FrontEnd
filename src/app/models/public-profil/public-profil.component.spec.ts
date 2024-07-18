import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfilComponent } from './public-profil.component';

describe('PublicProfilComponent', () => {
  let component: PublicProfilComponent;
  let fixture: ComponentFixture<PublicProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicProfilComponent]
    });
    fixture = TestBed.createComponent(PublicProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
