import { MessageInstance } from 'antd/es/message/interface';
import { createContext, useContext } from 'react';

export const MessageContext = createContext<MessageInstance | null>(null);
export function useMessage(): MessageInstance {
  const messageApi = useContext(MessageContext);

  if (!messageApi) {
    throw new Error('useMessage must be called inside MessageContext.Provider');
  } else {
    return messageApi;
  }
}
