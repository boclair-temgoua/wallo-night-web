import axios from "axios";

export interface ClientApiMethods {
  [key: string]: {
    endpoint: string;
    method: string;
  };
}

export type IntegrationApiCall = {
  action: string;
  body?: Object;
  urlParams?: Object;
  queryParams?: Object;
};

const user =
  typeof window !== "undefined"
    ? JSON.parse(
        String(
          localStorage.getItem(String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN))
        )
      )
    : null;

export const makeApiCall = async ({
  action,
  body,
  urlParams = {},
  queryParams = {},
}: IntegrationApiCall): Promise<any> => {
  const getURLEndpoint = (options: {
    endpoint: string;
    urlParams: any;
    queryParams: any;
  }) => {
    const { endpoint, urlParams, queryParams } = options;

    //replace params in url
    let url = endpoint;
    if (urlParams) {
      Object.keys(urlParams).forEach((key: string) => {
        url = url.replace(`:${key}`, urlParams[key]);
      });
    }

    //add query params
    if (queryParams) {
      url += "?";
      Object.keys(queryParams).forEach((key: string) => {
        if (queryParams[key]) {
          url += `${key}=${queryParams[key]}&`;
        }
      });
      url = url.slice(0, -1);
    }

    return url;
  };

  const url = getURLEndpoint({
    endpoint: apiEndpoints[action].endpoint,
    urlParams: urlParams,
    queryParams: queryParams,
  });

  axios.defaults.headers.common["Authorization"] = user ?? {};
  const response = await axios.request({
    method: apiEndpoints[action]?.method,
    withCredentials: true,
    url: url,
    data: body,
  });

  return response;
};

const POST = "post";
const GET = "get";
const DELETE = "delete";
const PUT = "put";

const baseUrl = process.env.NEXT_PUBLIC_HOST_SERVER;
export const apiEndpoints: ClientApiMethods = {
  /****************** User route */
  loginUser: {
    endpoint: `${baseUrl}/login`,
    method: POST,
  },
  registerUser: {
    endpoint: `${baseUrl}/register`,
    method: POST,
  },
  passwordResetUser: {
    endpoint: `${baseUrl}/password/reset`,
    method: POST,
  },
  resetPassword: {
    endpoint: `${baseUrl}/password/update/:token`,
    method: PUT,
  },
  resendCode: {
    endpoint: `${baseUrl}/resend/code/:userId`,
    method: GET,
  },
  validCode: {
    endpoint: `${baseUrl}/valid/code`,
    method: POST,
  },
  getOneUserPrivate: {
    endpoint: `${baseUrl}/users/show/:userId`,
    method: GET,
  },
  getOneUserPublic: {
    endpoint: `${baseUrl}/users/view`,
    method: GET,
  },

  /****************** Profile route */
  updateOneProfileNextStep: {
    endpoint: `${baseUrl}/profile/update/:userId`,
    method: PUT,
  },
  updateOneProfile: {
    endpoint: `${baseUrl}/users/update/profile/:profileId`,
    method: PUT,
  },
  updateEnableProfile: {
    endpoint: `${baseUrl}/users/update/enable/:profileId`,
    method: PUT,
  },
  getOneProfile: {
    endpoint: `${baseUrl}/users/profile/show/:profileId`,
    method: GET,
  },
  /****************** Currency or Countries route */
  getAllCurrencies: {
    endpoint: `${baseUrl}/currencies`,
    method: GET,
  },
  getAllCounties: {
    endpoint: `${baseUrl}/countries`,
    method: GET,
  },

  /****************** Comments route */
  getComments: {
    endpoint: `${baseUrl}/comments`,
    method: GET,
  },
  getCommentsRepliesAPI: {
    endpoint: `${baseUrl}/comments/replies`,
    method: GET,
  },
  createOneComment: {
    endpoint: `${baseUrl}/comments`,
    method: POST,
  },
  createOneCommentReply: {
    endpoint: `${baseUrl}/comments/replies`,
    method: POST,
  },
  updateOneComment: {
    endpoint: `${baseUrl}/comments/:commentId`,
    method: PUT,
  },
  deleteOneComment: {
    endpoint: `${baseUrl}/comments/:commentId`,
    method: DELETE,
  },

  /****************** Categories route */
  getCategories: {
    endpoint: `${baseUrl}/categories`,
    method: GET,
  },

  /****************** Order Events route */
  getOneOrderEvent: {
    endpoint: `${baseUrl}/order-events/view`,
    method: GET,
  },
  updateOneOrderEvent: {
    endpoint: `${baseUrl}/order-events/:orderEventId`,
    method: PUT,
  },

  /****************** Uploads route */
  getUploads: {
    endpoint: `${baseUrl}/uploads`,
    method: GET,
  },
  updateOneUpload: {
    endpoint: `${baseUrl}/uploads/update`,
    method: PUT,
  },

  /****************** Products route */
  getProducts: {
    endpoint: `${baseUrl}/products`,
    method: GET,
  },
  createOneProduct: {
    endpoint: `${baseUrl}/products`,
    method: POST,
  },
  updateOneProduct: {
    endpoint: `${baseUrl}/products/:productId`,
    method: PUT,
  },
  getOneProduct: {
    endpoint: `${baseUrl}/products/view`,
    method: GET,
  },
  deleteOneProduct: {
    endpoint: `${baseUrl}/products/:productId`,
    method: DELETE,
  },

  /****************** Events route */
  getEvents: {
    endpoint: `${baseUrl}/events`,
    method: GET,
  },
  createOneEvent: {
    endpoint: `${baseUrl}/events`,
    method: POST,
  },
  updateOneEvent: {
    endpoint: `${baseUrl}/events/:eventId`,
    method: PUT,
  },
  getOneEvent: {
    endpoint: `${baseUrl}/events/show`,
    method: GET,
  },
  deleteOneEvent: {
    endpoint: `${baseUrl}/events/:eventId`,
    method: DELETE,
  },

  /****************** Payments route */
  createOnePaymentsPaypalPayment: {
    endpoint: `${baseUrl}/payments/paypal/payment`,
    method: POST,
  },
  createOnePaymentsStripePayment: {
    endpoint: `${baseUrl}/payments/stripe/payment`,
    method: POST,
  },

  /****************** Posts route */
  createOnePostGallery: {
    endpoint: `${baseUrl}/posts/galleries`,
    method: POST,
  },
  createOnePost: {
    endpoint: `${baseUrl}/posts`,
    method: POST,
  },
  createOnUploadPost: {
    endpoint: `${baseUrl}/posts/upload`,
    method: POST,
  },
  getOnePost: {
    endpoint: `${baseUrl}/posts/view`,
    method: GET,
  },
  getFollowsPosts: {
    endpoint: `${baseUrl}/posts/follows`,
    method: GET,
  },
  updateOnePost: {
    endpoint: `${baseUrl}/posts/:postId`,
    method: PUT,
  },
  deleteOnePost: {
    endpoint: `${baseUrl}/posts/:postId`,
    method: DELETE,
  },
  getPosts: {
    endpoint: `${baseUrl}/posts`,
    method: GET,
  },
};
