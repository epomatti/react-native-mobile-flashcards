import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'FLASHCARD:NOTIFICATIONS'

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data == null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status !== 'denied') {
              Notifications.cancelAllScheduledNotificationsAsync()
              let today = new Date()
              today.setHours(today.getHours() + 1)
              today.setMinutes(today.getMinutes() + 20)
              Notifications.scheduleLocalNotificationAsync(
                {
                  title: 'Hey!',
                  body: "Don't forget to take your Quiz today"
                },
                { time: today }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}