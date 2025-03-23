import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedordersComponent } from './customizedorders.component';

describe('CustomizedordersComponent', () => {
  let component: CustomizedordersComponent;
  let fixture: ComponentFixture<CustomizedordersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizedordersComponent]
    });
    fixture = TestBed.createComponent(CustomizedordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
