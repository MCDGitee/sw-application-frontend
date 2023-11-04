import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './App.css'

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false); //New state for loading
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://fastapi-docker-por5.onrender.com/flows/customers")
      const json = await response.json();
      setCustomers(json)
    }
    fetchData();
}, []);

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
    <>
    <li>開案單自動填寫系統.</li>
    <li>後端伺服器若在15分鐘内沒有收到請求會進入休眠狀態.</li>
    <li>隔一段時間使用這個系統的時候要等一下, 不是當機不用擔心. </li>
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("customer", { required: true })}>
        {customers.map((customer) => <option>{customer}</option>)}
      </select>
      <hr></hr>
      <select {...register("recipient", { required: true })}>
        <option value="tem-pd37h@mail.foxconn.com">tem-pd37h@mail.foxconn.com</option>
        <option value="tem-pd36h@mail.foxconn.com">tem-pd36h@mail.foxconn.com</option>
        <option value="tem-pd24h@mail.foxconn.com">tem-pd24h@mail.foxconn.com</option>
        <option value="kun-che.lee@ftc-foxconn.com">kun-che.lee@ftc-foxconn.com</option>
      </select>
      <hr></hr>
      <input type="submit" disabled={isLoading} />
      {isLoading && <p>Loading...</p>}  {/* Show loading state*/}
    </form>
    </>

  )
}

export default App
