import { Address, fromNano, OpenedContract,  toNano } from "@ton/core";
import { RoyalUsdt } from "../wrappers/RoyalUsdt";
import { useAsyncInitialze } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useEffect, useState } from "react";
// import { useEffect, useState } from "react";

// const sleep = (ms: number) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

export function useRoyal() {
  const { sender, userAddress } = useTonConnect();
  const { client } = useTonClient();
  const [contractBalance, setContractBalance]= useState("")

  const RoyalContract = useAsyncInitialze(async () => {
    if (!client) return;

    const contract = RoyalUsdt.fromAddress(
      Address.parse("EQCmves9At_qiWqWBMtovpAXqHr7NS3W_C4NcbRieoBURNCf")
    );

    return client.open(contract) as OpenedContract<RoyalUsdt>;
  }, [client]);


  useEffect(() => {
    const getBalance = async () => {
      if (!RoyalContract) return; // Ensure the contract is initialized before fetching

      try {
        const contractBalanceBefore = await RoyalContract.getContractBalance();
        if (contractBalanceBefore) {
          const updatedBalance = fromNano(contractBalanceBefore);
          setContractBalance(updatedBalance);
          console.log("Updated contract balance:", updatedBalance);
        }
      } catch (error) {
        console.error("Error fetching contract balance:", error);
      }
    };

    getBalance();
  }, [RoyalContract]);

 
  return {
    Claim: async (amount: number, address: string) => {
     const contractBalanceBefore = await RoyalContract?.getContractBalance();
      console.log(contractBalanceBefore);
      let finalAmount = amount 
      let finalAmountString = finalAmount.toString()
     return new Promise(async(resolve, reject) => {
       const transactionHash = await RoyalContract?.send(
          sender,
          {
            value: toNano("0.05")
          },
          {
            $$type: "ClaimWinnings",
            to: Address.parse(address),
            amount: toNano(finalAmountString)

          }
        ).then(() => {
          // If the transaction was successful, resolve the promise
          resolve('Withdraw successful');
          console.log(transactionHash)
        }).catch((error) => {
          // If the transaction failed, reject the promise with an error
          reject(error);
        });
      });
    },

    Deposit: async (amount: number) => {
      const contractBalanceBefore = await RoyalContract?.getContractBalance();
      console.log(contractBalanceBefore);
      let finalAmount = amount + 0.05
      let finalAmountString = finalAmount.toString()
     return new Promise(async(resolve, reject) => {
       const transactionHash = await RoyalContract?.send(
          sender,
          {
            value: toNano(finalAmountString)
          },
          {
            $$type: "BuySpin",
            amount: toNano(amount)
          }
        ).then(() => {
          // If the transaction was successful, resolve the promise
          resolve('Deposit successful');
          console.log(transactionHash)
        }).catch((error) => {
          // If the transaction failed, reject the promise with an error
          reject(error);
        });
      });

    },

    Withdraw: async(amount: number)=>{
      const contractBalanceBefore = await RoyalContract?.getContractBalance();
      console.log(contractBalanceBefore);
      let finalAmount = amount 
      let finalAmountString = finalAmount.toString()
     return new Promise(async(resolve, reject) => {
       const transactionHash = await RoyalContract?.send(
          sender,
          {
            value: toNano("0.05")
          },
          {
            $$type: "Withdraw",
            recipient: Address.parse(userAddress),
            amount: toNano(finalAmountString)

          }
        ).then(() => {
          // If the transaction was successful, resolve the promise
          resolve('Withdraw successful');
          console.log(transactionHash)
        }).catch((error) => {
          // If the transaction failed, reject the promise with an error
          reject(error);
        });
      });
    },
    contractBalance




  };
}
