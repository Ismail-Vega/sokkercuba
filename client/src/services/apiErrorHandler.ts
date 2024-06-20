export const parseSokkerErrors = (code: any) => {
  switch (code) {
    case 3:
      return "notAuthorized";
    case 6:
      return "limitExceeded";
    default:
      return "networkError";
  }
};

export const parseApiErrors = (error: any) => {
  switch (error.code) {
    case "IOP-CUS-PV-3003":
      return "clientErrorInformation";
    default:
      return "invalidParameters";
  }
};
