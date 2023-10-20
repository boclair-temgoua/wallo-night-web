import { PaginationResponse } from "@/utils/pagination-item";
import { ColorType } from "./profile.type";

export type ResponseOrderEventModel = {
  value: Array<OrderEventModel>;
} & PaginationResponse;

export type StatusEvent = "ACTIVE" | "PENDING" | "COMPLETED";

export type OrderEventModel = {
  createdAt: Date;
  id: string;
  code: string;
  status: StatusEvent;
  transactionId: string;
  uploadsFile: any[];
  priceEvent: string;
  imageEvent: string;
  currency: string;
  event: {
    id: string;
    slug: string;
    price: number;
    title: string;
    address: string;
    currency: string;
    location: string;
    dateEvent: Date;
  };
  transaction: {
    id: string;
    token: string;
  };
};
