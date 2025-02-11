import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RastreiaInputComponent } from './rastreia-input.component';

describe('RastreiaInputComponent', () => {
  let component: RastreiaInputComponent;
  let fixture: ComponentFixture<RastreiaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RastreiaInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RastreiaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
