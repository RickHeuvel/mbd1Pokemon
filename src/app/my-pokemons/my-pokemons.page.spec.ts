import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPokemonsPage } from './my-pokemons.page';

describe('MyPokemonsPage', () => {
  let component: MyPokemonsPage;
  let fixture: ComponentFixture<MyPokemonsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPokemonsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPokemonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
