import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideProjectComponent } from './side-project.component';

describe('SideProjectComponent', () => {
  let component: SideProjectComponent;
  let fixture: ComponentFixture<SideProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
