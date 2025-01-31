import i18n from "../i18n";

import { ReactComponent as Consultation } from "../assets/svgs/consultation.svg";
import { ReactComponent as PhoneCall } from "../assets/svgs/phone-call.svg";
import { ReactComponent as VideoChat } from "../assets/svgs/video-chat.svg";

export const RADIO_CARD_DATA = [
  {
    label: i18n.t("modal.person"),
    value: 1,
    Icon: Consultation,
  },
  {
    label: i18n.t("modal.phone"),
    value: 2,
    Icon: PhoneCall,
  },
  {
    label: i18n.t("modal.video"),
    value: 3,
    Icon: VideoChat,
  },
];
