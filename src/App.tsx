import { ChangeEvent, useEffect, useState } from "react";
import CreditCard from "./components/CreditCard";
import CreditCardForm from "./components/CreditCardForm";
import { IFormData } from "./types/IFormData";
import { IError } from "./types/IError";
import { IFieldName } from "./types/IFieldName";

export const API_URL = "http://localhost:3001";

function App() {
  const [formData, setFormData] = useState<IFormData>({
    cardName: "",
    cardNumber: "",
    cvvNumber: "",
    expirationDate: "",
    id: "",
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

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`${API_URL}/get-cards`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: IFormData[] = await response.json();
        console.log(data);
      } catch (err: any) {
        alert(err.message);
      }
    };
    fetchCard();
  }, []);

  const onChangeField = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    const cardNumberRegex = /^\d{0,16}$/;
    const expiryRegex = /^\d{0,2}(\/\d{0,2})?$/;
    const cvvRegex = /^\d{0,3}$/;
    const cardNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{0,20}$/;
    const idRegex = /^.*$/;

    // FIELDS VALIDATION
    const validators: Record<IFieldName, RegExp> = {
      cardNumber: cardNumberRegex,
      expirationDate: expiryRegex,
      cvvNumber: cvvRegex,
      cardName: cardNameRegex,
      id: idRegex,
    };

    if (Object.keys(validators).includes(name)) {
      const fieldName = name as IFieldName;
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
      id: "",
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
