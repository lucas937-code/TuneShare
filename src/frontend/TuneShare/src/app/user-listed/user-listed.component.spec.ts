import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListedComponent } from './user-listed.component';

describe('UserListedComponent', () => {
  let component: UserListedComponent;
  let fixture: ComponentFixture<UserListedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserListedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
