import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzManagerComponent } from './quizz-manager.component';

describe('QuizzManagerComponent', () => {
  let component: QuizzManagerComponent;
  let fixture: ComponentFixture<QuizzManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
