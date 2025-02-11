import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RastreiaParamComponent } from './rastreia-param.component';

describe('RastreiaParamComponent', () => {
  let component: RastreiaParamComponent;
  let fixture: ComponentFixture<RastreiaParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RastreiaParamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RastreiaParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
