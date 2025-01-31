import i18n from "../../i18n";

export const SERVICES = {
  individual: 1,
  business: 2,
  both: 3,
};

export const MEDIA = {
  onlineOrPhone: 1,
  travelMyCustomers: 2,
  myCustomersTravelMe: 3,
};

export const radioServices = {
  [SERVICES.individual]: [i18n.t("profile.radio_answer_1")],
  [SERVICES.business]: [i18n.t("profile.radio_answer_2")],
  [SERVICES.both]: [
    i18n.t("profile.radio_answer_1"),
    i18n.t("profile.radio_answer_2"),
  ],
};

export const workMedia = {
  [MEDIA.onlineOrPhone]: [i18n.t("profile.checkbox_answer_1")],
  [MEDIA.travelMyCustomers]: [i18n.t("profile.checkbox_answer_2")],
  [MEDIA.myCustomersTravelMe]: [i18n.t("profile.checkbox_answer_3")],
};
