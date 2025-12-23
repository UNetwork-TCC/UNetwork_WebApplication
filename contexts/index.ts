import { themeContext } from './themeContext'
import { appLayoutContext } from './appLayoutContext'
import { chatContext } from './chatContext'
import ContextProvider from './ContextProvider'
import {
  SocketProvider,
  useSocket,
  useChatMessages,
  useMessageNotifications
} from './socketContext'
import {
  NotificationProvider,
  useNotifications,
  NotificationContext,
  type Notification
} from './notificationContext'

export {
  themeContext,
  appLayoutContext,
  chatContext,
  ContextProvider,
  SocketProvider,
  useSocket,
  useChatMessages,
  useMessageNotifications,
  NotificationProvider,
  useNotifications,
  NotificationContext
}

export type { Notification }
