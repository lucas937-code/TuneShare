import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraionComponent } from './registraion.component';

describe('RegistraionComponent', () => {
  let component: RegistraionComponent;
  let fixture: ComponentFixture<RegistraionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistraionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistraionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
