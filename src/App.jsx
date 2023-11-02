import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css'

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false); //New state for loading
  const onSubmit = async (data) => {
    setIsLoading(true); 
    try {
      const response = await fetch(`https://fastapi-docker-por5.onrender.com/flows/sw_app?customer=${data.customer}&recipient=${data.recipient}`);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("customer", { required: true })}>
        <option value="Dell">Dell</option>
        <option value="H3C">H3C</option>
        <option value="CESBG">CESBG</option>
        <option value="ZTE">ZTE</option>
      </select>
      <hr></hr>
      <select {...register("recipient", { required: true })}>
        <option value="tem-pd37h@mail.foxconn.com">tem-pd37h@mail.foxconn.com</option>
        <option value="kun-che.lee@ftc-foxconn.com">kun-che.lee@ftc-foxconn.com</option>
      </select>
      <hr></hr>
      <input type="submit" disabled={isLoading} />
      {isLoading && <p>Loading...</p>}  {/* Show loading state*/}
    </form>
  )
}

export default App
