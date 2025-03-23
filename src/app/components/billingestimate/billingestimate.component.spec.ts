import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingestimateComponent } from './billingestimate.component';

describe('BillingestimateComponent', () => {
  let component: BillingestimateComponent;
  let fixture: ComponentFixture<BillingestimateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingestimateComponent]
    });
    fixture = TestBed.createComponent(BillingestimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
