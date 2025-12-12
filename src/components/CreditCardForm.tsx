import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction } from "react";
import { IFormData } from "../types/IFormData";
import { IError } from "../types/IError";
import { IFieldName } from "../types/IFieldName";
import { isValidExpiry } from "../utils/isValidExpiry";
import { API_URL } from "../App";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onUpdate: (event: ChangeEvent<HTMLInputElement>) => void;
  formData: IFormData;
  error: IError;
  setError: Dispatch<SetStateAction<IError>>;
  onCancel: () => void;
}

const CreditCardForm: FC<Props> = ({
  onUpdate,
  formData,
  error,
  setError,
  onCancel,
}) => {
  const { cardNumber, expirationDate, cvvNumber, cardName } = formData;
  const { hasError, messages } = error;

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

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

    Object.keys(formData).forEach((field) => {
      const fieldName = field as IFieldName;
      const isValid = validators[fieldName].test(formData[fieldName]);

      setError((prevError) => ({
        ...prevError,
        hasError: isValid
          ? prevError.hasError.filter((field) => field !== fieldName)
          : [...new Set([...prevError.hasError, fieldName])],
      }));
    });

    if (!isValidExpiry(formData.expirationDate))
      return setError((prevErr) => ({
        ...prevErr,
        hasError: [...new Set([...prevErr.hasError, "expirationDate"])],
      }));

    try {
      const response = await fetch(`${API_URL}/create-card`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id: uuidv4() }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      alert(result.message);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <section className="form-field">
        <div>
          <label>Número de Tarjeta</label>
          <input
            name="cardNumber"
            onChange={onUpdate}
            autoComplete="off"
            type="text"
            pattern="\d{16}"
            value={cardNumber}
            required
          />
          {hasError.includes("cardNumber") && (
            <div className="error-message">{messages.cardNumber}</div>
          )}
        </div>
        <div>
          <label>Fecha de Vencimiento</label>
          <input
            name="expirationDate"
            onChange={onUpdate}
            autoComplete="off"
            type="text"
            value={expirationDate}
            required
          />
          {hasError.includes("expirationDate") && (
            <div className="error-message">{messages.expirationDate}</div>
          )}
        </div>
        <div>
          <label>Nombre Titular</label>
          <input
            name="cardName"
            onChange={onUpdate}
            autoComplete="off"
            type="text"
            value={cardName}
            required
          />
          {hasError.includes("cardName") && (
            <div className="error-message">{messages.cardName}</div>
          )}
        </div>
        <div>
          <label>CVV</label>
          <input
            name="cvvNumber"
            onChange={onUpdate}
            autoComplete="off"
            type="text"
            value={cvvNumber}
            required
          />
          {hasError.includes("cvvNumber") && (
            <div className="error-message">{messages.cvvNumber}</div>
          )}
        </div>
      </section>
      <section className="buttons-container">
        <button id="add-card-button">Agregar Tarjeta</button>
        <button id="cancel-button" type="button" onClick={onCancel}>
          Cancelar
        </button>
      </section>
    </form>
  );
};

export default CreditCardForm;
