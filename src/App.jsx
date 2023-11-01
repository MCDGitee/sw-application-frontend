import React from 'react';
import { useForm } from 'react-hook-form';
import './App.css'

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    // Here is an example URL, replace it with your own
    const url = `https://fastapi-docker-por5.onrender.com/flows/sw_app?customer=${data.customer}&recipient=${data.recipient}`;

    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
  }
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("customer", { required: true })}>
        <option value="Dell">Dell</option>
        <option value="H3C">H3C</option>
        <option value="CESBG">CESBG</option>
        <option value="ZTE">ZTE</option>
      </select>
      <select {...register("recipient", { required: true })}>
        <option value="tem-pd37h@mail.foxconn.com">tem-pd37h@mail.foxconn.com</option>
        <option value="kun-che.lee@ftc-foxconn.com">kun-che.lee@ftc-foxconn.com</option>
      </select>

      <input type="submit" />
    </form>
  )
}

export default App
