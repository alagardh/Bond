
import React, {useState} from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "react-bootstrap/Button"; 
import Form from 'react-bootstrap/Form';
import axios from 'axios';


const ChainCode = () => {

  const [errorMessage, setErrorMessage] = useState(null);
  const [tradeBal, setTradeBal] = useState(0);
  const [loader, setLoader] = useState(false);
  const baseURL = "http://localhost:4000/tokenization/";
  
  const sendTrade = async (event) => {
    event.preventDefault();
    try {
      const data = event.target.tradeRequest.value;
      setLoader(true);
      axios.post(`${baseURL}postRequest`, data)
        .then(response => {
          console.log(response.data.mintStatus);
          toast.success('Transaction Done !', {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          setLoader(false);
        })
        .catch(error => {
          console.log(error);
          toast.error('Transaction failed ! ' + error, {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
          setLoader(false);
        });
    } catch (err) {
      console.log(err)
    } finally {
      setLoader(false);
    }
  }
  
 
  const getBalance = async (t) => {
    // t.preventDefault();
    setLoader(true);
    
    axios.get(`${baseURL}balanceOf`)
      .then(response => {
        console.log(response.data);
        toast.success('Transaction Done !', {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        setLoader(false);
        setTradeBal(response.data);
      })
      .catch(error => {
        console.log(error);
        toast.error('Transaction failed ! ' + error, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        setLoader(false);
      });
  };
      
  return (
    <div className="main">
      
      <><div className="card">
        <ToastContainer />
        {loader ? <ThreeDots
          visible={loader}
          height="80"
          width="80"
          color="#5bb8fe"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        /> : <div>
          <div className='tokenBalance'>checkBalance : {tradeBal}</div>
          <Form className="form" onSubmit={sendTrade}>
            <Form.Control
              className="input"
              type="text"
              id="tradeRequest"
              name="name" placeholder='trade Request' />
            
            <Button className="button" type="submit" value="Confirm">
              Confirm
            </Button>
          </Form>
          <br />
          <Button className="button" onClick={getBalance} type="button">
            Fetch balance
          </Button>
        </div>}
        </div></>
      {errorMessage}
    </div>
  );

};

export default ChainCode;