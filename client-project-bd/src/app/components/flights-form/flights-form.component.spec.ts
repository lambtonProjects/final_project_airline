import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsFormComponent } from './flights-form.component';

describe('FlightsFormComponent', () => {
  let component: FlightsFormComponent;
  let fixture: ComponentFixture<FlightsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
