import { createAction, props } from '@ngrx/store';
import {
  IAllExpenses,
  IAllIncomes,
  IAccessToken,
  IExpenseCategories,
  IIncomeCategories,
  IUserInfo,
} from '../models/income-expense-models';
import { IToggleNavbar, IDateRange, ILoggedIn } from '../models/general-models';

const ALL_EXPENSES = '[HttpFetchService] All Expenses';
const ALL_INCOMES = '[HttpFetchService] All Incomes';
const INCOME_CATEGORIES = '[HttpFetchService] Income Categories';
const EXPENSE_CATEGORIES = '[HttpFetchService] Expense Categories';
const USER_INFO = '[HttpFetchService] User Info';
const DATE_RANGE = '[Date Range Picker] Date Range';
const CLEAR_DATE_RANGE = '[Date Range Picker] Clear Date Range';
const TOGGLE_NAVBAR = '[Navbar] Toggle Navbar';
const LOGGED_IN = '[Login Service] Logged In';

export const userInfo = createAction(
  USER_INFO,
  props<IUserInfo>()
);

export const allExpenses = createAction(
  ALL_EXPENSES,
  props<IAllExpenses>()
);

export const allIncomes = createAction(
  ALL_INCOMES,
  props<IAllIncomes>()
);

export const incomeCategories = createAction(
  INCOME_CATEGORIES,
  props<IIncomeCategories>()
);

export const expenseCategories = createAction(
  EXPENSE_CATEGORIES,
  props<IExpenseCategories>()
);

export const dateRange = createAction(
  DATE_RANGE,
  props<IDateRange>()
);

export const clearDateRange = createAction(
  CLEAR_DATE_RANGE,
  props<IDateRange>()
);

export const toggleNavbar = createAction(
  TOGGLE_NAVBAR,
  props<IToggleNavbar>()
);

export const loggedIn = createAction(
  LOGGED_IN,
  props<ILoggedIn>()
);
