import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeScreenComponent } from './type-screen.component';

describe('TypeScreenComponent', () => {
  let component: TypeScreenComponent;
  let fixture: ComponentFixture<TypeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
