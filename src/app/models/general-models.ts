export interface IUserInfo {
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

export interface IDateRange {
  startDate: number;
  endDate: number;
}

export interface IAppState {
  appState: {
    loggedIn: boolean;
    navbarOpen: boolean;
    dateRange: IDateRange;
    user_info: IUserInfo;
    incomes: object;
    expenses: object;
    income_categories: object[];
    expense_categories: object[];
  };
}

export interface IToggleNavbar {
  navbarOpen: boolean;
}

export interface ILoggedIn {
  loggedIn: boolean;
}
