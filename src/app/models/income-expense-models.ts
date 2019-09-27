export interface IAllExpenses {
  expenses:Object
}

export interface IAllIncomes {
  incomes:Object
}

export interface IExpenseCategories {
  expense_categories:Object
}

export interface IIncomeCategories {
  income_categories:Object
}

export interface IAccessToken {
  access_token:string;
}

export interface IUserInfo {
  user_info:Object;
}

interface userInfo {
  created_at: string,
  deleted_at: string,
  email: string,
  email_verified_at: string
  id: number,
  name: string,
  phone: string,
  roles: object[],
  skills: string[],
  team: string,
  team_id: string,
  updated_at: string
}

export interface IAppState {
  appState: {
    user_info: userInfo,
    incomes: object,
    expenses: object,
    income_categories: object[],
    expense_categories: object[]
  }
}
