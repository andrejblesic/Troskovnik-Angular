import { createAction, props } from '@ngrx/store';
import {
  IAllExpenses,
  IAllIncomes,
  IAccessToken,
  IExpenseCategories,
  IIncomeCategories
} from '../models/income-expense-models';

const ALL_EXPENSES = '[HttpService] All Expenses';
const ALL_INCOMES = '[HttpService] All Incomes';
const INCOME_CATEGORIES = '[HttpService] Income Categories';
const EXPENSE_CATEGORIES = '[HttpService] Expense Categories';
const ACCESS_TOKEN = '[HttpService] Access Token';

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

export const accessToken = createAction(
  ACCESS_TOKEN,
  props<IAccessToken>()
)
