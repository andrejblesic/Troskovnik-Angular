import { createAction, props } from '@ngrx/store';
import {
  IAllExpenses,
  IAllIncomes,
  IAccessToken,
  IExpenseCategories,
  IIncomeCategories,
  IUserInfo
} from '../models/income-expense-models';

const ALL_EXPENSES = '[HttpFetchService] All Expenses';
const ALL_INCOMES = '[HttpFetchService] All Incomes';
const INCOME_CATEGORIES = '[HttpFetchService] Income Categories';
const EXPENSE_CATEGORIES = '[HttpFetchService] Expense Categories';
const USER_INFO = '[HttpFetchService] User Info';

export const userInfo = createAction(
  USER_INFO,
  props<IUserInfo>()
)

export const allExpenses = createAction(
  ALL_EXPENSES,
  props<IAllExpenses>()
)

export const allIncomes = createAction(
  ALL_INCOMES,
  props<IAllIncomes>()
)

export const incomeCategories = createAction(
  INCOME_CATEGORIES,
  props<IIncomeCategories>()
)

export const expenseCategories = createAction(
  EXPENSE_CATEGORIES,
  props<IExpenseCategories>()
)
