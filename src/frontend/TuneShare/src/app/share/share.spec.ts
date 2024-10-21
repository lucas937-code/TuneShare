import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Share } from './share';

describe('ShareToSpotifyComponent', () => {
  let component: Share;
  let fixture: ComponentFixture<Share>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Share]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Share);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
