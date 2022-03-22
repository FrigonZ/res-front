import { OrderAction, OrderStatus } from './entity';

/** 返回错误码 */
export const enum ResCode {
  /** 失败 */
  FAIL = -1,
  /** 成功 */
  SUCCESS = 0,
  /** 鉴权错误 */
  AUTH_FAIL = 1,
  /** 错误 */
  EXCEPTION = 999,
}

/** http请求返回数据协议 */
export interface ResponseData<T> {
  /** 错误码 */
  code: ResCode;
  /** 错误信息 */
  msg: string;
  /** 返回数据 */
  data: T;
}

/** 订单数据交互参数 */
export interface OrderOption {
  time?: number;
  oid?: string;
  status?: OrderStatus;
  wsid?: string;
}

/** socket接口统一协议 */
export interface WebSocketUniq {
  action: OrderAction;
  options: OrderOption;
  id: string;
  data?: any;
}

export interface WebSocketResponse {
  data: WebSocketUniq[];
}

export interface WebSocketRequest {
  authorization: string;
  data: WebSocketUniq[];
}
