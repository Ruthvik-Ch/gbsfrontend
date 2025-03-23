import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodegenaratorComponent } from './barcodegenarator.component';

describe('BarcodegenaratorComponent', () => {
  let component: BarcodegenaratorComponent;
  let fixture: ComponentFixture<BarcodegenaratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarcodegenaratorComponent]
    });
    fixture = TestBed.createComponent(BarcodegenaratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
