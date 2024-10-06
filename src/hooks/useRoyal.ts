import { Address, OpenedContract,  toNano } from "@ton/core";
import { RoyalUsdt } from "../wrappers/RoyalUsdt";
import { useAsyncInitialze } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
// import { useEffect, useState } from "react";

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function useRoyal() {
  const { sender, userAddress } = useTonConnect();
  const { client } = useTonClient();

  const RoyalContract = useAsyncInitialze(async () => {
    if (!client) return;

    const contract = RoyalUsdt.fromAddress(
      Address.parse("EQDqmNnzLCA5hMoy0BiK38Rmqb1Gj0EOKTM41LnQCy5CkCI5")
    );

    return client.open(contract) as OpenedContract<RoyalUsdt>;
  }, [client]);



 
  return {
    Claim: async (amount: string) => {
      RoyalContract?.send(
        sender,
        {
          value: toNano("0.05"),
        },
        {
            $$type: "ClaimWinnings",
            amount: toNano(amount),
            to: Address.parse(userAddress)
        }
      );
    },

    Deposit: async (amount: number) => {
      const contractBalanceBefore = await RoyalContract?.getContractBalance();
      console.log(contractBalanceBefore);
      let finalAmount = amount + 0.05
      let finalAmountString = finalAmount.toString()
      RoyalContract?.send(
        sender,
        {
          value: toNano(finalAmountString)
        },
        {
            $$type: "BuySpin",
            amount:toNano(amount)
        }
      );

      let BalanceAfter = await RoyalContract?.getContractBalance();
      let attempt = 1;

      while (contractBalanceBefore === BalanceAfter) {
        console.log("Staking, attempt", attempt);
        await sleep(2000);
        BalanceAfter = await RoyalContract?.getContractBalance();
        attempt++;
      }
    },




  };
}