import { ITaxPayerFormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/index.props";
import { ISignUpFormData } from "../../pages/Auth/SignUp/TaxPayer/SignUpForm/index.props";
import { IIndividualStep1FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Individual/Step1/index.props";
import { IIndividualStep2FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Individual/Step2/index.props";
import { IIndividualStep3FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Individual/Step3/index.props";
import { IIndividualStep4FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Individual/Step4/index.props";
import { IIndividualStep5FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Individual/Step5/index.props";
import { IIndividualStep6FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Individual/Step6/index.props";
import { IIndividualStep7FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Individual/Step7/index.props";
import { IIndividualStep8FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Individual/Step8/index.props";
import { IIndividualStep9FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Individual/Step9/index.props";
import { ISmsVerificationFormData } from "../../pages/Auth/SignUp/TaxPayer/SmsVerification/index.props";

import { IBusinessStep1FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Business/Step1/index.props";
import { IBusinessStep2FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Business/Step2/index.props";
import { IBusinessStep3FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Business/Step3/index.props";
import { IBusinessStep4FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Business/Step4/index.props";
import { IBusinessStep5FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Business/Step5/index.props";
import { IBusinessStep6FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Business/Step6/index.props";
import { IBusinessStep7FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Business/Step7/index.props";
import { IBusinessStep8FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Business/Step8/index.props";
import { IBusinessStep9FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Business/Step9/index.props";
import { IBusinessStep10FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Business/Step10/index.props";
import { IBusinessStep11FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Business/Step11/index.props";
import { IBusinessStep12FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Business/Step12/index.props";
import { IBusinessStep13FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Business/Step13/index.props";
import { IBusinessStep14FormData } from "../../pages/Home/TaxPayer/Quotes/InitialQuestions/Business/Step14/index.props";

import { IExpertStep1FormData } from "../../pages/Auth/SignUp/Expert/Step1/index.props";
import { IExpertStep2FormData } from "../../pages/Auth/SignUp/Expert/Step2/index.props";
import { IExpertStep3FormData } from "../../pages/Auth/SignUp/Expert/Step3/index.props";
import { IExpertStep4FormData } from "../../pages/Auth/SignUp/Expert/Step4/index.props";
import { IExpertStep5FormData } from "../../pages/Auth/SignUp/Expert/Step5/index.props";
import { IExpertStep6FormData } from "../../pages/Auth/SignUp/Expert/Step6/index.props";
import { IExpertStep8FormData } from "../../pages/Auth/SignUp/Expert/Step8/index.props";

export interface IAuthState {
  twoFactorAuthIsActive?: boolean;
  token?: string;
  loading: boolean;
  error?: any;
}

export interface ISignInWithValidationCodePayload {
  email: string;
  code: string;
}

export interface ISignInWithValidationCodeResponse {
  token: string;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ISignInResponse {
  token?: string;
  twoFactorAuthIsActive?: boolean;
}

export interface ISignUpPayload
  extends ISignUpFormData,
    ISmsVerificationFormData {}

export interface ISignUpExpertPayload
  extends ISignUpFormData,
    ISmsVerificationFormData {
  initialQuestions: ISignUpExpertInitialQuestionsPayload;
}

export interface ISignUpIndividualPayload
  extends ITaxPayerFormData,
    IIndividualStep1FormData,
    IIndividualStep2FormData,
    IIndividualStep3FormData,
    IIndividualStep4FormData,
    IIndividualStep5FormData,
    IIndividualStep6FormData,
    IIndividualStep7FormData,
    IIndividualStep8FormData,
    IIndividualStep9FormData {
  invitationkey?: string;
}

export interface ISignUpBusinessPayload
  extends ITaxPayerFormData,
    IBusinessStep1FormData,
    IBusinessStep2FormData,
    IBusinessStep3FormData,
    IBusinessStep4FormData,
    IBusinessStep5FormData,
    IBusinessStep6FormData,
    IBusinessStep7FormData,
    IBusinessStep8FormData,
    IBusinessStep9FormData,
    IBusinessStep10FormData,
    IBusinessStep11FormData,
    IBusinessStep12FormData,
    IBusinessStep13FormData,
    IBusinessStep14FormData {
  invitationkey?: string;
}

export interface ISignUpExpertInitialQuestionsPayload
  extends ITaxPayerFormData,
    IExpertStep1FormData,
    IExpertStep2FormData,
    IExpertStep3FormData,
    IExpertStep4FormData,
    IExpertStep5FormData,
    IExpertStep6FormData,
    IExpertStep8FormData {}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  validationCode: string;
  password: string;
  confirmPassword: string;
}

export interface IChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
