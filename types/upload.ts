export type UploadFolderType = "posts" | "events" | "products";

export type UploadModel = {
  createdAt: Date;
  uid: string;
  name: string;
  status: string;
  url: string;
  productId: string;
  path: string;
};
