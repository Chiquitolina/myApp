import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingTextComponent } from './drawing-text.component';

describe('DrawingTextComponent', () => {
  let component: DrawingTextComponent;
  let fixture: ComponentFixture<DrawingTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
