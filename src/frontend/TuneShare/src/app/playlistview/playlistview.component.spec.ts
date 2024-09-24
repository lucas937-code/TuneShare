import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistviewComponent } from './playlistview.component';

describe('PlaylistviewComponent', () => {
  let component: PlaylistviewComponent;
  let fixture: ComponentFixture<PlaylistviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaylistviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
