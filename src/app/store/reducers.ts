import { Action, createReducer, on } from '@ngrx/store';
import * as actions from "./actions";

interface State {
  incomes: {},
  expenses: {},
  income_categories: {},
  expense_categories: {}
}

const initialState = {};

export const transactionReducer = createReducer(
  initialState,
  on(actions.allExpenses, (state, action) => ({...state, expenses: {...action.expenses}})),
  on(actions.allIncomes, (state, action) => ({...state, incomes: {...action.incomes}})),
  on(actions.accessToken, (state, action) => ({...state, access_token: action.access_token})),
  on(actions.incomeCategories, (state, action) => ({...state, income_categories: action.income_categories})),
  on(actions.expenseCategories, (state, action) => ({...state, expense_categories: action.expense_categories}))
)
