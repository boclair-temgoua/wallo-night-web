export type UploadFolderType = "posts" | "order-events" | "events" | "products";

export type UploadModel = {
  createdAt: Date;
  uid: string;
  name: string;
  status: string;
  url: string;
  productId: string;
  path: string;
};
