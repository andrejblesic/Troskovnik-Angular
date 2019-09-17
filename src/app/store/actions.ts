import { createAction, props } from '@ngrx/store';
import { IExpense, IIncome, IAllExpenses, IAllIncomes } from '../models/income-expense-models';

// const NEW_EXPENSE = '[HttpService] New Expense';
// const NEW_INCOME = '[HttpService] New Income';
const ALL_EXPENSES = '[HttpService] All Expenses';
const ALL_INCOMES = '[HttpService] All Incomes';

// export const newExpense = createAction(
//   NEW_EXPENSE,
//   props<IExpense>()
// )

// export const newIncome = createAction(
//   NEW_INCOME,
//   props<IIncome>()
// );
//
export const allExpenses = createAction(
  ALL_EXPENSES,
  props<IAllExpenses>()
)

export const allIncomes = createAction(
  ALL_INCOMES,
  props<IAllIncomes>()
)
