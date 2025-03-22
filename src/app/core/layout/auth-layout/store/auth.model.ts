export interface IauthTokenState {
    token: string | null;
    user: {
      id: string;
      role: string;
    } | null;
  }