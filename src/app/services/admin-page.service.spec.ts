import { TestBed } from '@angular/core/testing';

import { AdminPage } from './admin-page.service';

describe('AdminPage', () => {
  let service: AdminPage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
