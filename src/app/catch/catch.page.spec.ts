import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchPage } from './catch.page';

describe('CatchPage', () => {
  let component: CatchPage;
  let fixture: ComponentFixture<CatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
