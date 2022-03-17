import { WEBSOCKET_URL } from '../constant/cgi';
import { OrderAction } from '../constant/entity';
import {
  OrderOption, WebSocketRequest, WebSocketUniq,
} from '../constant/protocol';

let client: WebSocket;

/** 心跳频率 1分钟 */
const HEART_BEAT_STEP = 60000;

const waitData: WebSocketUniq[] = [];

let timer: NodeJS.Timer;

let socketId = 0;

export const createWebSocket = (callback: (msg: string) => void) => {
  if (client) return;
  client = new WebSocket(WEBSOCKET_URL);
  const handleMessage = (e: MessageEvent<any>) => {
    removeTimer();
    initTimer();
    callback(e.data);
  };
  client.addEventListener('message', handleMessage);
  initTimer();
};

export const closeWebSocket = () => {
  if (!client) return;
  removeTimer();
  client.close();
};

export const sendWsMessage = () => {
  if (!client) return;
  if (!waitData.length) {
    const rawHeartBeat: WebSocketRequest = {
      data: [{
        action: OrderAction.HEART_BEAT,
        options: {},
        id: getSocketId(),
      }],
    };
    client.send(JSON.stringify(rawHeartBeat));
    return;
  }
  const rawRequest: WebSocketRequest = {
    data: waitData,
  };
  client.send(JSON.stringify(rawRequest));
};

const getSocketId = (): string => {
  const id = socketId;
  socketId += 1;
  return `request-${id}`;
};

export const addWaitData = (option: {
  action: OrderAction, options: OrderOption, data?: any
}, sendImmediately = false) => {
  const { action, options, data } = option;
  waitData.push({
    action,
    options,
    data,
    id: getSocketId(),
  });

  if (sendImmediately) {
    sendWsMessage();
  }
};

export const heartBeat = () => {
  sendWsMessage();
  timer = setTimeout(() => closeWebSocket(), HEART_BEAT_STEP);
};

export const initTimer = () => {
  timer = setTimeout(heartBeat, HEART_BEAT_STEP);
};

export const removeTimer = () => {
  clearTimeout(timer);
};
