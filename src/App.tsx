import { ChangeEvent, useState } from "react";
import CreditCard from "./components/CreditCard";
import CreditCardForm from "./components/CreditCardForm";
import { IFormData } from "./types/IFormData";
import { IError } from "./types/IError";
import { IFieldName } from "./types/IFieldName";

function App() {
  const [formData, setFormData] = useState<IFormData>({
    cardName: "",
    cardNumber: "",
    cvvNumber: "",
    expirationDate: "",
  });
  const [error, setError] = useState<IError>({
    hasError: [],
    messages: {
      cardName:
        "Cardholder name must contain only letters and spaces, up to 20 characters long.",
      cardNumber:
        "Card number must contain only digits and be up to 16 characters long.",
      expirationDate: "Expiration date must be in MM/YY format (e.g., 05/27).",
      cvvNumber: "CVV must contain only digits and be up to 3 characters long.",
    },
  });

  const onChangeField = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    const cardNumberRegex = /^\d{0,16}$/;
    const expiryRegex = /^\d{0,2}(\/\d{0,2})?$/;
    const cvvRegex = /^\d{0,3}$/;
    const cardNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{0,20}$/;

    // FIELDS VALIDATION
    const validators: Record<IFieldName, RegExp> = {
      cardNumber: cardNumberRegex,
      expirationDate: expiryRegex,
      cvvNumber: cvvRegex,
      cardName: cardNameRegex,
    };

    if (Object.keys(validators).includes(name)) {
      const fieldName = name as IFieldName; // type narrowing
      const isValid = validators[fieldName].test(value);

      setError((prevError) => ({
        ...prevError,
        hasError: isValid
          ? prevError.hasError.filter((field) => field !== fieldName)
          : [...new Set([...prevError.hasError, fieldName])],
      }));

      if (!isValid) return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const clearForm = (): void => {
    setFormData({
      cardName: "",
      cardNumber: "",
      cvvNumber: "",
      expirationDate: "",
    });
  };

  return (
    <div className="app">
      <CreditCard data={formData} error={error} />
      <CreditCardForm
        onUpdate={onChangeField}
        formData={formData}
        error={error}
        onCancel={clearForm}
        setError={setError}
      />
    </div>
  );
}

export default App;
