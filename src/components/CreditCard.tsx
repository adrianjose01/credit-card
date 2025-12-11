import { FC, useEffect, useState } from "react";
import chip from "../Images/chip.png";
import masterCard from "../Images/money.png";
import { IFormData } from "../types/IFormData";
import { IError } from "../types/IError";

interface Props {
  data: IFormData;
  error: IError;
}

const CreditCard: FC<Props> = ({ data, error }) => {
  const { expirationDate, cardName, cardNumber } = data;
  const { hasError } = error;
  const [bottom, setBottom] = useState("65%");

  useEffect(() => {
    if (
      (hasError.includes("cardName") && hasError.includes("cardNumber")) ||
      (hasError.includes("expirationDate") && hasError.includes("cvvNumber"))
    ) {
      setBottom("70%");
    } else {
      setBottom("65%");
    }
  }, [hasError]);

  return (
    <div className="credit-card-container" style={{ bottom: bottom }}>
      <div>
        <section className="card-header">
          <p className="card-header__title">monobank</p>
          <div className="card-header__divider"></div>
          <p className="card-header__subtitle">Universal Bank</p>
        </section>
        <section className="card-header__icon">
          <i className="fa-solid fa-rss"></i>
        </section>
      </div>

      <div>
        <img className="card-chip" src={chip} alt="chip" />
      </div>

      <div className="card-number-section">
        <small className="card-number__label">world</small>
        <p className="card-number__value">
          {cardNumber.padEnd(16, "*").replace(/(.{4})(?=.)/g, "$1 ")}
        </p>
      </div>

      <div className="card-footer">
        <section className="card-footer__details">
          <div className="card-expiration">
            <div className="card-expiration__label">
              <small>VALID</small>
              <small>THRU</small>
            </div>
            <p className="card-expiration__value">{expirationDate}</p>
          </div>
          <div className="card-holder">
            <p className="card-holder__name">{cardName.toUpperCase()}</p>
          </div>
        </section>
        <section>
          <img className="card-brand-logo" src={masterCard} alt="master card" />
        </section>
      </div>
    </div>
  );
};

export default CreditCard;
