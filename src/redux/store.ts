import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import logger from "redux-logger";

import commonReducer from "./commonSlice";
import authReducer from "./authSlice";
import expertProfileReducer from "./expertProfileSlice";
import taxpayerProfileReducer from "./taxpayerProfileSlice";
import quotesReducer from "./quotesSlice";
import individualOrganizerReducer from "./individualOrganizerSlice";
import businessOrganizerReducer from "./businessOrganizerSlice";
import messageReducer from "./messageSlice";
import conversationReducer from "./conversationSlice";
import requestsReducer from "./requestsSlice";
import taxPreparationReducer from "./taxPreparationSlice";
import appointmentReducer from "./appointmentSlice";
import notificationReducer from "./notificationSlice";
import generateLinkReducer from "./generateLinkSlice";
import calendarSyncReducer from "./calendarSyncSlice";
import feedbackReducer from "./feedbackSlice";
import contactReducer from "./contactSlice";
import userReducer from "./userSlice";
import documentReducer from "./documentSlice";
import emailSubscriptionReducer from "./emailSubscriptionSlice";
import blogReducer from "./blogSlice";

export const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    expertProfile: expertProfileReducer,
    taxpayerProfile: taxpayerProfileReducer,
    quotes: quotesReducer,
    requests: requestsReducer,
    individualOrganizer: individualOrganizerReducer,
    businessOrganizer: businessOrganizerReducer,
    message: messageReducer,
    conversation: conversationReducer,
    taxPreparation: taxPreparationReducer,
    appointment: appointmentReducer,
    notifications: notificationReducer,
    generateLink: generateLinkReducer,
    calendarSync: calendarSyncReducer,
    feedback: feedbackReducer,
    contact: contactReducer,
    user: userReducer,
    document: documentReducer,
    emailSubscription: emailSubscriptionReducer,
    blog: blogReducer,
  },
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
