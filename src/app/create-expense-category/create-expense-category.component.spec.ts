import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpenseCategoryComponent } from './create-expense-category.component';

describe('CreateExpenseCategoryComponent', () => {
  let component: CreateExpenseCategoryComponent;
  let fixture: ComponentFixture<CreateExpenseCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExpenseCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExpenseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
