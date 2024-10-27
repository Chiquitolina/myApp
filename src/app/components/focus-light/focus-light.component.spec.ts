import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusLightComponent } from './focus-light.component';

describe('FocusLightComponent', () => {
  let component: FocusLightComponent;
  let fixture: ComponentFixture<FocusLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FocusLightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FocusLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
