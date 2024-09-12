import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistRotateComponent } from './playlist-rotate.component';

describe('PlaylistRotateComponent', () => {
  let component: PlaylistRotateComponent;
  let fixture: ComponentFixture<PlaylistRotateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistRotateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaylistRotateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
