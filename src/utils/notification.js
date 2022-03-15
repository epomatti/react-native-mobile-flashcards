import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';
// import * as Notifications from "expo-notifications";

const NOTIFICATION_KEY = 'FLASHCARD:NOTIFICATIONS'

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(cancelAllScheduledNotifications())
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data == null) {
        Notifications.ask
        // Permissions.askAsync(Permissions.NOTIFICATIONS)
        //   .then(({ status }) => {
        //     if (status !== 'denied') {
        //       cancelAllScheduledNotifications()
        //       let today = new Date()
        //       today.setHours(today.getHours() + 1)
        //       today.setMinutes(today.getMinutes() + 20)
        //       scheduleNotification();
        //       AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        //     }
        //   })
      }
    })
}

export function cancelAllScheduledNotifications() {
  if (!isWeb()) {
    Notifications.cancelAllScheduledNotificationsAsync()
  }
}

export function scheduleNotification() {
  if (!isWeb()) {
    Notifications.scheduleNotificationAsync(
      {
        title: 'Hey!',
        body: "Don't forget to take your Quiz today"
      },
      { time: today }
    )
  }
}

export function isWeb() {
  return Platform.OS === 'web';
}