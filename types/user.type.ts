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
  firstName: string;
  lastName: string;
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
  permission: string;
  organizationInUtilizationId: string;
  profileId: string;
  profile: {
    color: string;
    countryId: string;
    fullName: string;
    id: string;
    image: string;
    url: string;
    userId: string;
  };
  refreshToken: string;
  nextStep: NextStep;
  token: string;
};

username: "bokin-1659";
export type UserForgotPasswordFormModel = {
  email: string;
};
