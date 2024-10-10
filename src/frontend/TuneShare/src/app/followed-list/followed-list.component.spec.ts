import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedListComponent } from './followed-list.component';

describe('FriendsListComponent', () => {
  let component: FollowedListComponent;
  let fixture: ComponentFixture<FollowedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
