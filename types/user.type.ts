export type NextStep =
  | "SETTING_PROFILE"
  | "SETTING_INTEREST"
  | "CONFIRM_EMAIL"
  | "COMPLETE_REGISTRATION";

export type UserLoginFormModel = {
  email: string;
  password: string;
};

export type UserRegisterFormModel = {
  email: string;
  confirm: boolean;
  password: string;
  fullName: string;
  birthday?: string;
  nextStep?: NextStep;
};

export type UserResetPasswordFormModel = {
  newPassword: string;
  token?: string;
  passwordConfirm: string;
};

export type UserModel = {
  accessToken: string;
  confirmedAt: string;
  createdAt: Date;
  email: string;
  id: string;
  organizationInUtilizationId: string;
  profileId: string;
  refreshToken: string;
  nextStep: NextStep;
  token: string;
};

username: "bokin-1659";
export type UserForgotPasswordFormModel = {
  email: string;
};