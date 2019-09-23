import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIncomeCategoryComponent } from './create-income-category.component';

describe('CreateIncomeCategoryComponent', () => {
  let component: CreateIncomeCategoryComponent;
  let fixture: ComponentFixture<CreateIncomeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIncomeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIncomeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
