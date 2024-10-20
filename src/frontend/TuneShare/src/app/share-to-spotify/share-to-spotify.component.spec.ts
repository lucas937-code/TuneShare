import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareToSpotifyComponent } from './share-to-spotify.component';

describe('ShareToSpotifyComponent', () => {
  let component: ShareToSpotifyComponent;
  let fixture: ComponentFixture<ShareToSpotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareToSpotifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareToSpotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
