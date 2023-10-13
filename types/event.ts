import { PaginationResponse } from "@/utils/pagination-item";
import { ColorType } from "./profile.type";

export type ResponseEventModel = {
  value: Array<EventModel>;
} & PaginationResponse;

export type EventModel = {
  createdAt: Date;
  id: string;
  title: string;
  location: string;
  requirement: string;
  slug: string;
  dateEvent: Date;
  urlRedirect: string;
  enableUrlRedirect: boolean;
  price: string;
  address: string;
  currency: string;
  description: string;
  messageAfterPayment: string;
  status: string;
  userId: string;
  organizationId: string;
  profile: {
    color: ColorType;
    image: string;
    userId: string;
    fullName: string;
    lastName: string;
    username: string;
    firstName: string;
  };
  organization: {
    name: string;
    image: string;
  };
  uploadsImage: any;
  uploadsFile: any[];
};

export type EventFormModel = {
  title: string;
  location: string;
  currency: string;
  price: string;
  address: string;
  messageAfterPayment: string;
  urlRedirect: string;
  dateEvent: Date;
  description: string;
  attachments: any;
  attachment: any;
  fileList: any;
  newFileLists: any;
  imageList: any;
  newImageLists: any;
};
