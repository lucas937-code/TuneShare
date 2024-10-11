import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmExportComponent } from './confirm-export.component';

describe('ConfirmExportComponent', () => {
  let component: ConfirmExportComponent;
  let fixture: ComponentFixture<ConfirmExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmExportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
