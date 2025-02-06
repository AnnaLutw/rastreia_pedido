import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocoUmComponent } from './bloco-um.component';

describe('BlocoUmComponent', () => {
  let component: BlocoUmComponent;
  let fixture: ComponentFixture<BlocoUmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlocoUmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlocoUmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
