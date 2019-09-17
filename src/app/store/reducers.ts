import { Action, createReducer, on } from '@ngrx/store';
import * as actions from "./actions";
import { IExpense, IIncome } from "../models/income-expense-models";

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
  on(actions.allIncomes, (state, action) => ({...state, incomes: {...action.incomes}}))
)
