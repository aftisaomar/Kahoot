import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzRoomComponent } from './quizz-room.component';

describe('QuizzRoomComponent', () => {
  let component: QuizzRoomComponent;
  let fixture: ComponentFixture<QuizzRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
