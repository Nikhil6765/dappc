import { useState,useEffect } from 'react'
import './App.css'
import abi from "./contractJson/chai.json"
import {ethers} from "ethers"
import Buy from './components/Buy'
import Memos from './components/Memos'
import chai from "./chai.gif"

function App() {
  const [state, setState] = useState({

    provider:null,
    signer:null,
    contract:null

  })
  const[account,setAccount]=useState('Not connected')
  useEffect(()=>{
    const template=async()=>{

      const contractAddress="0x09409E6471CE090B4196CFB4a9706E03b7C7dB06";
      const contractABI=abi.abi;

      const{ethereum}=window;

      const account=await ethereum.request({
        method:"eth_requestAccounts"
      })

      window.ethereum.on("accountsChanged",()=>{
        window.location.reload()
      })
      setAccount(account);

      const provider=new ethers.providers.Web3Provider(ethereum);
      const signer=provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer

      )
      console.log(contract)
    setState({provider,signer,contract});
    

    }
    template(

    );

  },[])
  return (
    <div style={{backgroundColor:"#EFEFEF",height:"100%"}}>
    <img src={chai} className="img-fluid" alt=".." width="100%"/>
    <p
      /*class="text-muted lead"*/
      style={{marginTop:"10px",marginLeft:"5px"}}
    >
      <small>Connected account : {account }</small>
    </p>

    <div className="container">
      <Buy state={state}></Buy>
      <Memos state={state}></Memos>
    </div>
  </div>
  )
}

export default App
