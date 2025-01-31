export const isEmail = (email?: string) => {
  if (!email) return false;

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return emailRegex.test(email);
};


export const validateRequiredField = (value: string, fieldName?: string): string | undefined => {
  if (!value || value.trim() === "") {
    return fieldName ? `${fieldName} is required.` : "This field is required.";
  }
  return undefined;
};
