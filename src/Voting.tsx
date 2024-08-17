import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const votingABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "candidateId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "CandidateAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "candidateId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "name": "VoteReceived",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "candidatesCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCandidates",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct Voting.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "hasVoted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "resetVotes",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "candidateId",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; 

interface Candidate {
  id: number;
  name: string;
  voteCount: number;
}

const Voting: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    connectWallet();
    initContract();
  }, []);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(accounts[0]);
        setCurrentAccount(accounts[0]);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  const initContract = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, votingABI, signer);
        
        setContract(contract);
        checkOwner(contract);
        fetchCandidates(contract);
      }
    } catch (error) {
      console.error('Error initializing contract:', error);
    }
  };

  const fetchCandidates = async (contract: any) => {
    try {
      const candidates = await contract.getCandidates();
      let newarray = candidates.map((candidate: any) => {
        return {
            id:  ethers.BigNumber.from(candidate.id).toNumber(),
            name : candidate.name,
            voteCount : ethers.BigNumber.from(candidate.voteCount).toNumber()
        };
      });
      
      setCandidates(newarray);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const vote = async (candidateId: number) => {
    setError(false);
    setMsg("");
    console.log(candidateId);
    try {
      if (contract) {
        const tx = await contract.vote(candidateId);
        await tx.wait();
        fetchCandidates(contract);
        alert('Vote successful!');
      }
    } catch (error : any) {
        setError(true);
        setMsg(error.reason);
      console.error('Error voting:', error.reason);
    }
  };

  const resetVotes = async () => {
    try {
      if (contract) {
        const tx = await contract.resetVotes();
        await tx.wait();
        fetchCandidates(contract);
        alert('Votes reset successful!');
      }
    } catch (error) {
      console.error('Error resetting votes:', error);
    }
  };

  const checkOwner = async (contract: any) => {
    try {
      const owner = await contract.owner();
      console.log(owner);
      setIsOwner(owner.toLowerCase() === currentAccount?.toLowerCase());
    } catch (error) {
      console.error('Error checking owner:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Voting DApp</h1>
      <div className="flex justify-center">
        {currentAccount ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Candidates:</h2>
            {error &&  <span  className='text-red-500' >  {msg}  </span> }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="p-4 border rounded shadow-sm">
                  <h3 className="text-xl font-bold">{candidate.name}</h3>
                  <p>Votes: {candidate.voteCount}</p>
                  <button
                    onClick={() => vote(candidate.id)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    Vote
                  </button>
                </div>
              ))}
            </div>
            {isOwner && (
              <div className="mt-8 text-center">
                <button
                  onClick={resetVotes}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  Reset Votes
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Voting;
