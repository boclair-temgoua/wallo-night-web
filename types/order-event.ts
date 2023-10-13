import { PaginationResponse } from "@/utils/pagination-item";
import { ColorType } from "./profile.type";

export type ResponseEventModel = {
  value: Array<OrderEventModel>;
} & PaginationResponse;

export type StatusEvent = "ACTIVE" | "PENDING" | "COMPLETED";

export type OrderEventModel = {
  createdAt: Date;
  id: string;
  code: string;
  status: StatusEvent;
  transactionId: string;
  uploadsFile: [];
  event: {
    id: string;
    price: number;
    title: string;
    address: string;
    currency: string;
    location: string;
    dateEvent: Date;
  };
};
