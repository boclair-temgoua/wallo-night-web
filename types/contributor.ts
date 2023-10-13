import { PaginationResponse } from "@/utils/pagination-item";

export const arrayRoleContributors = [
  { id: "1", name: "ADMIN" },
  { id: "2", name: "MODERATOR" },
];

export type ResponseContributorModel = {
  value: Array<ContributorModel>;
} & PaginationResponse;

export type ContributorModel = {
  createdAt: Date;
  id: string;
  userId: string;
  type: string;
  userCreatedId: string;
  profile: {
    color: string;
    permission: string;
    email: string;
    image: null;
    userId: string;
    fullName: string;
  };
  role: {
    name: string;
  };
};

export type ContributorFormModel = {
  email: string;
  role: string;
  permission: string;
  firstName: string;
  lastName: string;
};
