import {Permissions,Notifications } from 'expo';
import {sendPostRequestToServer1} from './sendPostRequestToServer'
export const setToken=async (payload,url)=>{
    await sendPostRequestToServer1(payload,url)
    console.log('Token Updated')
  }
export const registerForPushNotificationsAsync=async ()=> {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    return token
  }