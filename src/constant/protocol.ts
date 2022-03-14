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
