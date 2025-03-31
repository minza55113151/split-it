/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
export interface ModelsExpense {
  Amount?: number;
  CreatedAt?: string;
  Currency?: string;
  DebtorSubID?: string;
  Icon?: string;
  ID?: number;
  Note?: string;
  PayerSubID?: string;
  SplitType?: string;
  Status?: string;
  Title?: string;
  UpdatedAt?: string;
}

export interface ModelsFriendResponse {
  CreatedAt?: string;
  Email?: string;
  ID?: number;
  ImageURL?: string;
  Name?: string;
  Status?: string;
  SubID?: string;
  UpdatedAt?: string;
}

export interface ModelsUser {
  CreatedAt?: string;
  Email?: string;
  ID?: number;
  ImageURL?: string;
  Name?: string;
  SubID?: string;
  UpdatedAt?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Split-It API
 * @version 1.0
 * @contact
 *
 * This is a sample server for the Split-It application.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  expenses = {
    /**
     * @description Get user expenses with status
     *
     * @tags expenses
     * @name ExpensesList
     * @summary Get user expenses with status
     * @request GET:/expenses
     * @secure
     */
    expensesList: (
      query?: {
        /** Status */
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelsExpense[], string>({
        path: `/expenses`,
        method: "GET",
        query: query,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create expense
     *
     * @tags expenses
     * @name ExpensesCreate
     * @summary Create expense
     * @request POST:/expenses
     * @secure
     */
    expensesCreate: (expense: ModelsExpense, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/expenses`,
        method: "POST",
        body: expense,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update expense
     *
     * @tags expenses
     * @name ExpensesUpdate
     * @summary Update expense
     * @request PUT:/expenses/{id}
     * @secure
     */
    expensesUpdate: (
      id: string,
      expense: ModelsExpense,
      params: RequestParams = {},
    ) =>
      this.request<string, string>({
        path: `/expenses/${id}`,
        method: "PUT",
        body: expense,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete expense
     *
     * @tags expenses
     * @name ExpensesDelete
     * @summary Delete expense
     * @request DELETE:/expenses/{id}
     * @secure
     */
    expensesDelete: (id: string, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/expenses/${id}`,
        method: "DELETE",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  friends = {
    /**
     * @description Get friends
     *
     * @tags friends
     * @name FriendsList
     * @summary Get friends
     * @request GET:/friends
     * @secure
     */
    friendsList: (params: RequestParams = {}) =>
      this.request<ModelsFriendResponse[], string>({
        path: `/friends`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create friend
     *
     * @tags friends
     * @name FriendsCreate
     * @summary Create friend
     * @request POST:/friends/{subID}
     * @secure
     */
    friendsCreate: (subId: string, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/friends/${subId}`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete friend
     *
     * @tags friends
     * @name FriendsDelete
     * @summary Delete friend
     * @request DELETE:/friends/{subID}
     * @secure
     */
    friendsDelete: (subId: string, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/friends/${subId}`,
        method: "DELETE",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * @description Get user details
     *
     * @tags users
     * @name UsersList
     * @summary Get a user
     * @request GET:/users
     * @secure
     */
    usersList: (params: RequestParams = {}) =>
      this.request<ModelsUser, string>({
        path: `/users`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update a user
     *
     * @tags users
     * @name UsersUpdate
     * @summary Update a user
     * @request PUT:/users
     * @secure
     */
    usersUpdate: (user: ModelsUser, params: RequestParams = {}) =>
      this.request<ModelsUser, string>({
        path: `/users`,
        method: "PUT",
        body: user,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new user
     *
     * @tags users
     * @name UsersCreate
     * @summary Create a new user
     * @request POST:/users
     * @secure
     */
    usersCreate: (params: RequestParams = {}) =>
      this.request<ModelsUser, string>({
        path: `/users`,
        method: "POST",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get users by name
     *
     * @tags users
     * @name UsersDetail
     * @summary Get users by name
     * @request GET:/users/{name}
     * @secure
     */
    usersDetail: (name: string, params: RequestParams = {}) =>
      this.request<ModelsUser[], string>({
        path: `/users/${name}`,
        method: "GET",
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
