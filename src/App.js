import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import { Button } from "react-bootstrap";


function BlockHistoryList() {



  const [block, setBlock] = useState(
    {
      "block_time": null, 
      "coin_amount": null, 
      "consensus_timer": null, 
      "creator": null, 
      "default_increase_of_fee": null, 
      "default_optimum_transaction_number": null, 
      "default_transaction_fee": null, 
      "dowload_true_block": null, 
      "empty_block_number": null, 
      "fee_address": null, 
      "first_time": null, 
      "gap_block_number": null, 
      "genesis_time": null, 
      "hard_block_number": null, 
      "hash": null, 
      "max_data_size": null, 
      "max_tx_number": null, 
      "minumum_transfer_amount": null, 
      "part_amount": null, 
      "part_amount_cache": null, 
      "previous_hash": null, 
      "round_1": "", 
      "round_1_time": null, 
      "round_2": "", 
      "round_2_starting_time": null, 
      "round_2_time": null, 
      "sequence_number": null, 
      "shares": [], 
      "start_time": null, 
      "sync": null, 
      "transaction_delay_time": null, 
      "transaction_fee": null, 
      "validated": "", 
      "validated_time": null, 
      "validating_list": []
    }
  );
  const [current_block_number, setcurrent_block_number] = useState();

  var [open, setOpen] = React.useState(false);

  useEffect(() => {
    
    async function fetchData() {
      const response = await fetch('http://test_net.1.naruno.org:8101/export/block/json');


      const data = await response.json();
      //const data = {
      //  "block_time": 22, 
      //  "coin_amount": 10000000, 
      //  "consensus_timer": 0.5, 
      //  "creator": "37487e08340f97eaa3e635c9c6a4ef5bfa287207", 
      //  "default_increase_of_fee": 0.01, 
      //  "default_optimum_transaction_number": 1, 
      //  "default_transaction_fee": 0.02, 
      //  "dowload_true_block": "", 
      //  "empty_block_number": 95, 
      //  "fee_address": "37487e08340f97eaa3e635c9c6a4ef5bfa287207", 
      //  "first_time": false, 
      //  "gap_block_number": 4, 
      //  "genesis_time": 1672564238, 
      //  "hard_block_number": 2, 
      //  "hash": "f33ee369a762ff2c0da1ce22193d1e5e4c5d1b5de949a3150c714d45bf4b4902", 
      //  "max_data_size": 1000000, 
      //  "max_tx_number": 2, 
      //  "minumum_transfer_amount": 1000, 
      //  "part_amount": 100000, 
      //  "part_amount_cache": "1a00d983803e3adcbda2ed40ecba828083221648a90150267d8b0fd500c59750", 
      //  "previous_hash": "1a00d983803e3adcbda2ed40ecba828083221648a90150267d8b0fd500c59750", 
      //  "round_1": false, 
      //  "round_1_time": 10, 
      //  "round_2": false, 
      //  "round_2_starting_time": null, 
      //  "round_2_time": 10, 
      //  "sequence_number": 0, 
      // "shares": [], 
      //  "start_time": 1672566328, 
      //  "sync": false, 
      //  "transaction_delay_time": 60, 
      //  "transaction_fee": 0.02, 
      //  "validated": false, 
      //  "validated_time": null, 
      //  "validating_list": [
      //    {
      //      "amount": 15000.0, 
      //      "data": "", 
      //      "fromUser": "MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEz1/9iGubbMvbi+iv7fqiQ82JLmIem6fH+NiZPF3uxPgB4EEwKwuUW8rlmjebiW+iBDoc8jiAeAP/zHHRn3ovUg==", 
      //      "sequence_number": 1, 
      //      "signature": "MEYCIQDh2XJEEKV8mBz1/s7LXkK9i+bQJv7FtYCD1hsI16RZOAIhAOQxEc14qyLReodGZWmLYYtOAOEvQbwNcgz6Ap5zBroF", 
      //      "toUser": "abc", 
      //      "transaction_fee": 0.02, 
      //      "transaction_time": 1672568667
      //    }
      //  ]
      //}

      // get the sequence_number + empty_block_number from data as json
      setcurrent_block_number(data.sequence_number + data.empty_block_number);
      

      setBlock(data);
    }
    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);





  return (
    <ul>
        <h5 class="card-subtitle mb-2 text-white bg-dark">Block #{current_block_number}</h5>
          <ul>
          <li key={block}>Hash: {block.hash}</li>
          <li key={block}>Previous Block Hash: {block.previous_hash}</li>

          <li key={block}>Time: {block.block_time}</li>
          <li key={block}>Validated: {block.validated.toString()}</li>

          <li key={block}>Start Time: {block.start_time}</li>


          <li key={block}>Round 1: {block.round_1.toString()}</li>

          <li key={block}>Round 2: {block.round_2.toString()}</li>
          <li key={block}>Transaction Fee: {block.transaction_fee}</li>

          <li key={block}>Minimum Transfer Amount: {block.minumum_transfer_amount}</li>

          <li key={block}>Sequance Number: {block.sequence_number}</li>
          <li key={block}>Empty Block Number: {block.empty_block_number}</li>



          <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        ariaa-expanded={open}
      >
        Validating List
      </Button>
      <Collapse in={open}>


          <ul>
            {block.validating_list.map((item) => (
              <li key={item}>To: {item.toUser}
              <ul>
                  <li key={item}>From: {item.fromUser}</li>
                  <li key={item}>Amount: {item.amount}</li>
                  <li key={item}>Transaction Fee: {item.transaction_fee}</li>
                  <li key={item}>Transaction Time: {item.transaction_time}</li>
                  <li key={item}>Sequance Number: {item.sequence_number}</li>
                  <li key={item}>Signature: {item.signature}</li>
                  <li key={item}>Data: {item.data}</li>
              </ul>
              </li>
            ))}
            
          </ul>  
      </Collapse>

          </ul>
    </ul>
  );
}

function DNS_navbar() {
  const title = 'Naruno Scan';
  return (
    <nav className="navbar navbar-expand-lg text-white bg-dark">
      <div className="container-fluid">
      <a class="navbar-brand text-white bg-dark" href="#">
    <img src="https://docs.naruno.org/assets/images/logo.png" width="30" height="30" class="d-inline-block align-top text-<white" alt="Naruno"/>

    {title}
  </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active text-white bg-dark" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white bg-dark" href="https://naruno.org/">
                Website
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white bg-dark"
                href="https://github.com/Naruno/Naruno"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function mapRange(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function getGradient(value) {
  value = 100 - value;
  const percent =  value / 100;
  const r =  Math.round(255 * percent);
  const g = Math.round(255 * (1 - percent));
  return `rgb(${r}, ${g}, 0)`;
}

function Naruno_Scan() {
  const [connected_nodes, setconnected_nodes] = useState([]);
  const [last_transaction_of_us, setlast_transaction_of_us] = useState([]);
  const [progress, setProgress] = useState(0);
  const [health, setHealth] = useState("Loading");

  useEffect(() => {
    async function fetchData() {
      let data = null
      try {
        const response = await fetch('http://test_net.1.naruno.org:8102/status');
        data = await response.json();
      } catch (e) {
        console.log(e)
        setHealth("Offline");
        setProgress(0);

        const interval = setInterval(() => {
          fetchData();
        }, 55000);

        return () => clearInterval(interval);
      }

      //const data = {
      //  "connected_nodes": [
      //    "0.0.0.0:8011", 
      //    "0.0.0.0:8012"
      //  ], 
      //  "first_block": "{'coin_amount': 10000000, 'first_time': False, 'creator': '37487e08340f97eaa3e635c9c6a4ef5bfa287207', 'genesis_time': 1672564238, 'start_time': 1672564832, 'block_time': 22, 'previous_hash': '1a00d983803e3adcbda2ed40ecba828083221648a90150267d8b0fd500c59750', 'sequence_number': 0, 'empty_block_number': 27, 'hard_block_number': 2, 'gap_block_number': 4, 'validating_list': [], 'transaction_fee': 0.02, 'default_transaction_fee': 0.02, 'default_optimum_transaction_number': 1, 'default_increase_of_fee': 0.01, 'transaction_delay_time': 60, 'max_data_size': 1000000, 'part_amount': 100000, 'hash': '4fa89b85956608bd71f9de25a3b6265350ced56bb9f31aa0d103cdbca0656cac', 'part_amount_cache': '1a00d983803e3adcbda2ed40ecba828083221648a90150267d8b0fd500c59750', 'max_tx_number': 2, 'minumum_transfer_amount': 1000, 'round_1_time': 10, 'round_1': False, 'round_2_starting_time': None, 'round_2_time': 10, 'round_2': False, 'consensus_timer': 0.5, 'validated': False, 'validated_time': None, 'dowload_true_block': '', 'sync': False, 'shares': [], 'fee_address': '37487e08340f97eaa3e635c9c6a4ef5bfa287207'}", 
      //  "last_transaction_of_block": "", 
      //  "new_block": "{'coin_amount': 10000000, 'first_time': False, 'creator': '37487e08340f97eaa3e635c9c6a4ef5bfa287207', 'genesis_time': 1672564238, 'start_time': 1672564876, 'block_time': 22, 'previous_hash': '1a00d983803e3adcbda2ed40ecba828083221648a90150267d8b0fd500c59750', 'sequence_number': 0, 'empty_block_number': 29, 'hard_block_number': 2, 'gap_block_number': 4, 'validating_list': [], 'transaction_fee': 0.02, 'default_transaction_fee': 0.02, 'default_optimum_transaction_number': 1, 'default_increase_of_fee': 0.01, 'transaction_delay_time': 60, 'max_data_size': 1000000, 'part_amount': 100000, 'hash': '2c98ff8f9a1acc774c7654758b68b9ff66fdf7cc9933be52c8b0cb61e97b1de5', 'part_amount_cache': '1a00d983803e3adcbda2ed40ecba828083221648a90150267d8b0fd500c59750', 'max_tx_number': 2, 'minumum_transfer_amount': 1000, 'round_1_time': 10, 'round_1': True, 'round_2_starting_time': 1672564886, 'round_2_time': 10, 'round_2': False, 'consensus_timer': 0.5, 'validated': False, 'validated_time': None, 'dowload_true_block': '', 'sync': False, 'shares': [], 'fee_address': '37487e08340f97eaa3e635c9c6a4ef5bfa287207'}", 
      //  "status": "Working", 
      //  "transactions_of_us": "[\"{'sequence_number': 3, 'signature': 'MEUCIA1t27MwY+gN5M8bxZWrQVQiz1rxuMTpJj61cDVopT2UAiEAm/9fjlTTvKnYiYz3lqvUptDfj0sbG9JOxQubjZAEbQI=', 'fromUser': 'MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEshgihUeZV0+BKeNMl+vB+tLt57gTPNnBYRMTG1110UhKj5VH1THG/MI+JUJkV66Ii8593W/D+MCR4e1wgXEZoQ==', 'toUser': 'onur', 'data': 'atakan', 'amount': 1500.0, 'transaction_fee': 0.02, 'transaction_time': 1672573102} | True\", \"{'sequence_number': 2, 'signature': 'DN', 'fromUser': 'DN', 'toUser': '9f5ce7262d8d55da47203f0080089921d599a166', 'data': 'NP', 'amount': 0.02, 'transaction_fee': 0.0, 'transaction_time': 1672573988} | False\", \"{'sequence_number': 2, 'signature': 'MEUCIQCEDZWH1wnGlaXzH+U5FH790XP0WDv3v+/c9aRfF+Tp2gIgKzRWRBMn/a5FKstHlh4Xi4VkrE10/OHpwfVV9BWpSgs=', 'fromUser': 'MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEshgihUeZV0+BKeNMl+vB+tLt57gTPNnBYRMTG1110UhKj5VH1THG/MI+JUJkV66Ii8593W/D+MCR4e1wgXEZoQ==', 'toUser': 'aaa', 'data': '', 'amount': 1500.0, 'transaction_fee': 0.02, 'transaction_time': 1672573954} | True\",  \"{'sequence_number': 0, 'signature': 'DN', 'fromUser': 'DN', 'toUser': '9f5ce7262d8d55da47203f0080089921d599a166', 'data': 'NP', 'amount': 0.02, 'transaction_fee': 0.0, 'transaction_time': 1672573988} | False\", \"{'sequence_number': 0, 'signature': 'MEUCIQCEDZWH1wnGlaXzH+U5FH790XP0WDv3v+/c9aRfF+Tp2gIgKzRWRBMn/a5FKstHlh4Xi4VkrE10/OHpwfVV9BWpSgs=', 'fromUser': 'MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEshgihUeZV0+BKeNMl+vB+tLt57gTPNnBYRMTG1110UhKj5VH1THG/MI+JUJkV66Ii8593W/D+MCR4e1wgXEZoQ==', 'toUser': 'aaa', 'data': '', 'amount': 1500.0, 'transaction_fee': 0.02, 'transaction_time': 1672573954} | True\"]"
      //}
      
      const status = data.status;

      setconnected_nodes(data.connected_nodes);
      const the_list = JSON.parse(data.transactions_of_us)
      setlast_transaction_of_us(the_list[the_list.length-1]);




      
      if (status == "Working") {
        setHealth(status);
        setProgress(100);
      } else if (status == "Not working") {
        setHealth(status);
        setProgress(0);
      }
    }
    const interval = setInterval(() => {
      fetchData();
    }, 55000);

    return () => clearInterval(interval);
  }, []);

  return (
    
    <Container>
      <DNS_navbar />
      <br />
      <br />

      

    <div className="container ">

      <div className="row justify-content-between gx-5 text-break">

        <div className="col col-lg-4 text-white bg-dark">
        <div class="card mb-3 text-white bg-dark">
          <h2 class="card-title text-center text-white bg-dark">Connected Nodes</h2>
            <br />
            <ul>
                <ul>
                  {connected_nodes.map((node) => (
                    <li key={node}>{node}</li>
                  ))}
                </ul>



            </ul>   
          </div>  
          <div class="card mb-3 text-white bg-dark">
          <h2 class="card-title text-center text-white bg-dark">Last transaction of us</h2>
            <br />
            <ul>

                    <ul>
                        <li key={last_transaction_of_us}>{last_transaction_of_us}</li>
                    </ul>


            </ul>        
        </div>          

        </div>



        <div className="col col-lg-4 text-white bg-dark">
        <div class="card text-center text-white bg-dark">
          <h2 class="card-title text-white bg-dark">Healty</h2>
            <br />
            <CircularProgressbar
              value={progress}
              text={health}
              strokeWidth={10}
              styles={buildStyles({
                textColor: getGradient(progress),
                textSize: '16px',
                pathColor: getGradient(progress),
                trailColor: '#fff',
              })}
            />
          </div>
        </div>

        <div className="col col-lg-4 text-white bg-dark">
        <div class="card text-white bg-dark">
          <h2 class="card-title text-center text-white bg-dark">Block</h2>
          <br />
          <div>
          <BlockHistoryList />
          </div>
        </div>
        </div>
        
      </div>
    </div>
    </Container>
  );
}




export default Naruno_Scan;



