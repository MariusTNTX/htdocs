import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Observables1Component } from './observables1.component';

describe('Observables1Component', () => {
  let component: Observables1Component;
  let fixture: ComponentFixture<Observables1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Observables1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Observables1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
