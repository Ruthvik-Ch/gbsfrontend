import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPreviewComponent } from './billingpreview.component';

describe('BillingPreviewComponent', () => {
  let component: BillingPreviewComponent;
  let fixture: ComponentFixture<BillingPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingPreviewComponent]
    });
    fixture = TestBed.createComponent(BillingPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
