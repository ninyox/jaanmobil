import * as Notifications from "expo-notifications";

const SetNotification = async (title, text, time) => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    //alert("You ")
    return;
  }
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: text,
    },
    trigger: time,
  });
};

export default SetNotification;
