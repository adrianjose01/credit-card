export type IError = {
  hasError: string[];
  messages: {
    cardName: string;
    cardNumber: string;
    expirationDate: string;
    cvvNumber: string;
  };
};
