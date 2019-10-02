export interface IAllExpenses {
  expenses: object;
}

export interface IAllIncomes {
  incomes: object;
}

export interface IExpenseCategories {
  expense_categories: object;
}

export interface IIncomeCategories {
  income_categories: object;
}

export interface IAccessToken {
  access_token: string;
}

export interface IUserInfo {
  user_info: object;
}

export interface IDateRange {
  startDate: number;
  endDate: number;
}

interface userInfo {
  created_at: string;
  deleted_at: string;
  email: string;
  email_verified_at: string;
  id: number;
  name: string;
  phone: string;
  roles: object[];
  skills: string[];
  team: string;
  team_id: string;
  updated_at: string;
}

export interface IAppState {
  appState: {
    dateRange: IDateRange;
    user_info: userInfo;
    incomes: object;
    expenses: object;
    income_categories: object[];
    expense_categories: object[];
  };
}
