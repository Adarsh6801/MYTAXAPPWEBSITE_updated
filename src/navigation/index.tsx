import { useEffect, useMemo } from "react";
import {
  Routes,
  Route,
  PathRouteProps,
  LayoutRouteProps,
  IndexRouteProps,
} from "react-router-dom";

import {
  FORGOT_PASSWORD_PAGE,
  SIGN_UP_EXPERT_PAGE,
  SIGN_UP_TAX_PAYER_PAGE,
  PRIVACY_POLICY_PAGE,
  RESET_PASSWORD_PAGE,
  CONGRATS_RESET_PASSWORD_PAGE,
  EMAIL_CODE_VERIFICATION_PAGE,
  ORGANIZER_INDIVIDUAL_PAGE,
  ORGANIZER_BUSINESS_PAGE,
  SIGN_UP_EXPERT_FORM_PAGE,
  EXPERT_PROFILE_PAGE,
  EXPERT_REQUESTS,
  EXPERT_TAX_PREPARATION,
  EXPERT_MESSAGES,
  TAXPAYER_QUOTES,
  TAXPAYER_TAX_PREPARATION,
  TAXPAYER_PERSONAL_TAX_PREPARATION,
  TAXPAYER_MESSAGES,
  TAXPAYER_ADD_QUOTE,
  PAYMENT_PAGE,
  TERMS_CONDITIONS_PAGE,
  ABOUT_PAGE,
  TAXPAYER_PROFILE_PAGE,
  CHANGE_PASSWORD_PAGE,
  CONTACT_US_PAGE,
  BLOG_PAGE,
  PRICING_PAGE,
  EXPERT_APPOINTMENTS_CALENDAR,
  BLOGS_PAGE,
  INITIAL_PAGE,
  FAQ_PAGE,
  LANDING_EXPERT_PAGE,
  LANDING_TAXPAYER_PAGE,
  SIGN_IN_PAGE,
} from "../constants/routes";
import { USER_ROLES } from "../constants/users";
import { PrivateRoute } from "./PrivateRoute";
import { getExpertProfileInfo } from "../redux/expertProfileSlice";
import LandingExpert from "../pages/LandingExpert";
import LandingTaxpayer from "../pages/LandingTaxpayer";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Condition from "../pages/Condition";
import SignIn from "../pages/Auth/SignIn";
import NotFound from "../pages/NotFound";
import TaxPayerSignUp from "../pages/Auth/SignUp/TaxPayer";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import CongratsResetPassword from "../pages/Auth/CongratsResetPassword";
import EmailCodeVerification from "../pages/Auth/EmailCodeVerification";
import ExpertSignUp from "../pages/Auth/SignUp/Expert";
import ExpertForms from "../pages/Auth/SignUp/Expert/ExpertForms";
import ExpertProfile from "../pages/ExpertProfile";
import About from "../pages/About";
import ExpertRequests from "../pages/Home/Expert/Requests";
import TaxPayerQuotes from "../pages/Home/TaxPayer/Quotes";
import PersonalTaxPreparation from "../pages/Home/PersonalTaxPreparation";
import Messenger from "../pages/Home/Messenger";
import OrganizerIndividual from "../pages/Organizer/Individual";
import OrganizerBusiness from "../pages/Organizer/Business";
import TaxPayerTaxPreparation from "../pages/Home/TaxPayer/TaxPreparation";
import ExpertTaxPreparation from "../pages/Home/Expert/TaxPreparation";
import TaxPayerAddQuote from "../pages/Home/TaxPayer/Quotes/InitialQuestions";
import Payment from "../pages/Payment";
import { getNotifications } from "../redux/notificationSlice";
import TaxpayerProfile from "../pages/TaxpayerProfile";
import { getUser } from "../redux/userSlice";
import { logout } from "../redux/authSlice";
import { setInactivityTimeout } from "../helpers/timer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ChangePassword from "../pages/ChangePassword";
import ContactUs from "../pages/ContactUs";
import { getLandingUserType } from "../helpers/storage";
import Blog from "../pages/Blog";
import Blogs from "../pages/Blogs";
import Pricing from "../pages/Pricing";
import AppointmentsCalendar from "../pages/Home/Expert/AppointmentsCalendar";
import FAQ from "../pages/FAQ";
import InitialPage from "../pages/InitialPage";

const RootNavigation = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.auth);
  const { user } = useAppSelector(state => state.user);
  const publicRoutes = useMemo<
    Array<PathRouteProps | LayoutRouteProps | IndexRouteProps>
  >(
    () => [
      {
        path: INITIAL_PAGE,
        element: <InitialPage />,
      },
      {
        path: LANDING_TAXPAYER_PAGE,
        element: <LandingTaxpayer />,
      },
      {
        path: LANDING_EXPERT_PAGE,
        element: <LandingExpert />,
      },
      {
        path: FAQ_PAGE,
        element: <FAQ />,
      },
      {
        path: PRICING_PAGE,
        element: <Pricing />,
      },
      {
        path: BLOG_PAGE,
        element: <Blog />,
      },
      {
        path: BLOGS_PAGE,
        element: <Blogs />,
      },
      {
        path: CONTACT_US_PAGE,
        element: <ContactUs />,
      },
      {
        path: PRIVACY_POLICY_PAGE,
        element: <PrivacyPolicy />,
      },
      {
        path: TERMS_CONDITIONS_PAGE,
        element: <Condition />,
      },
      {
        path: ABOUT_PAGE,
        element: <About />,
      },
      {
        path: SIGN_IN_PAGE,
        element: <SignIn />,
      },
      {
        path: SIGN_UP_TAX_PAYER_PAGE,
        element: <TaxPayerSignUp />,
      },
      {
        path: SIGN_UP_EXPERT_PAGE,
        element: <ExpertSignUp />,
      },
      {
        path: SIGN_UP_EXPERT_FORM_PAGE,
        element: <ExpertForms />,
      },
      {
        path: FORGOT_PASSWORD_PAGE,
        element: <ForgotPassword />,
      },
      {
        path: EMAIL_CODE_VERIFICATION_PAGE,
        element: <EmailCodeVerification />,
      },
      {
        path: CONGRATS_RESET_PASSWORD_PAGE,
        element: <CongratsResetPassword />,
      },
      {
        path: RESET_PASSWORD_PAGE,
        element: <ResetPassword />,
      },
    ],
    [],
  );
  const privateRoutes = useMemo<
    Array<PathRouteProps | LayoutRouteProps | IndexRouteProps>
  >(
    () => [
      {
        path: CHANGE_PASSWORD_PAGE,
        element: (
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        ),
      },
      {
        path: EXPERT_REQUESTS,
        element: (
          <PrivateRoute>
            <ExpertRequests />
          </PrivateRoute>
        ),
      },
      {
        path: EXPERT_TAX_PREPARATION,
        element: (
          <PrivateRoute>
            <ExpertTaxPreparation />
          </PrivateRoute>
        ),
      },
      {
        path: EXPERT_MESSAGES,
        element: (
          <PrivateRoute>
            <Messenger />
          </PrivateRoute>
        ),
      },
      {
        path: TAXPAYER_QUOTES,
        element: (
          <PrivateRoute>
            <TaxPayerQuotes />
          </PrivateRoute>
        ),
      },
      {
        path: TAXPAYER_TAX_PREPARATION,
        element: (
          <PrivateRoute>
            <TaxPayerTaxPreparation />
          </PrivateRoute>
        ),
      },
      {
        path: TAXPAYER_PERSONAL_TAX_PREPARATION,
        element: (
          <PrivateRoute>
            <PersonalTaxPreparation />
          </PrivateRoute>
        ),
      },
      {
        path: TAXPAYER_ADD_QUOTE,
        element: (
          <PrivateRoute>
            <TaxPayerAddQuote />
          </PrivateRoute>
        ),
      },
      {
        path: TAXPAYER_MESSAGES,
        element: (
          <PrivateRoute>
            <Messenger />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ExpertProfile />
          </PrivateRoute>
        ),
      },
      {
        path: EXPERT_PROFILE_PAGE,
        element: (
          <PrivateRoute>
            <ExpertProfile />
          </PrivateRoute>
        ),
      },
      {
        path: EXPERT_APPOINTMENTS_CALENDAR,
        element: (
          <PrivateRoute>
            <AppointmentsCalendar />
          </PrivateRoute>
        ),
      },
      {
        path: TAXPAYER_PROFILE_PAGE,
        element: (
          <PrivateRoute>
            <TaxpayerProfile />
          </PrivateRoute>
        ),
      },
      {
        path: PAYMENT_PAGE,
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: ORGANIZER_INDIVIDUAL_PAGE,
        element: (
          <PrivateRoute>
            <OrganizerIndividual />
          </PrivateRoute>
        ),
      },
      {
        path: ORGANIZER_BUSINESS_PAGE,
        element: (
          <PrivateRoute>
            <OrganizerBusiness />
          </PrivateRoute>
        ),
      },
    ],
    [],
  );

  useEffect(() => {
    if (!!token) {
      dispatch(getUser());
      dispatch(getNotifications());

      setInactivityTimeout(() => {
        dispatch(logout(INITIAL_PAGE));
      });
    } else {
      const landingUserType = getLandingUserType();
      const path = window.location.pathname;

      if (
        !landingUserType &&
        path !== INITIAL_PAGE &&
        path !== SIGN_UP_EXPERT_PAGE &&
        path !== SIGN_UP_TAX_PAYER_PAGE
      ) {
        window.location.href = INITIAL_PAGE;
      }
    }
  }, []);

  useEffect(() => {
    if (user?.roleId === USER_ROLES.Expert) {
      dispatch(getExpertProfileInfo());
    }
  }, [user]);

  return (
    <Routes>
      {publicRoutes.map((routeProps, index) => (
        <Route key={`public_route_${index}`} {...routeProps} />
      ))}

      {privateRoutes.map((routeProps, index) => (
        <Route key={`private_route_${index}`} {...routeProps} />
      ))}

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RootNavigation;
