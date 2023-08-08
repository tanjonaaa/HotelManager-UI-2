import React, { useState } from "react";
import "./reserve.css"
import {useFetch} from "use-http";
import { useEffect } from "react";

function Reserve() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("option1");
  const [methods, setMethods] = useState([]);
  const {get, post, response, error, loading} = useFetch('http://localhost:8000');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données soumises :", { startDate, endDate, paymentMethod });
  };

  async function getPaymentMethods(){
    const methods = await get('/payment_method');

    if(response.ok) setMethods(methods);
  }

  useEffect(() => {getPaymentMethods()},[]);

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <label>
        Choisissez la plage de dates de séjour:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>

      <br />

      <label>
        Choisissez un mode de paiement:
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
        {
          methods.map(method => {
            return (
              <option value={method.name} key={method.id}>{method.name}</option>
            )
          })
        }
        </select>
      </label>

      <br />

      <button type="submit">Effectuer la Réservation</button>
    </form>
  );
}

export default Reserve;


/* function ReservationForm() {


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Choisissez la plage de dates de séjour:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>

      <br />

      <label>
        Choisissez une option:
        <select
          value={paymentMethod}
          onChange={(e) => setpaymentMethod(e.target.value)}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </label>

      <br />

      <button type="submit">Effectuer la Réservation</button>
    </form>
  );
}

export default ReservationForm; */
