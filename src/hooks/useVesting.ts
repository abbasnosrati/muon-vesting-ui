import { useEffect, useState } from "react";
import Papa from "papaparse";
import { useAccount } from "wagmi";
import { W3bNumber } from "../types/wagmi";
import { w3bNumberFromString } from "../utils/web3";

const useVestedMuon = () => {
  const [vestedAmount, setVestedAmount] = useState<W3bNumber | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { address: walletAddress } = useAccount();
  useEffect(() => {
    if (!walletAddress) return;
    fetch("/assets/files/pionVesting.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (result: any) => {
            const data = result.data;
            const userData = data.find(
              (entry: any) =>
                entry.address.toLowerCase() === walletAddress.toLowerCase()
            );
            if (userData) {
              setVestedAmount(w3bNumberFromString(userData["Vested MUON"]));
            } else {
              setVestedAmount(null);
            }
            setDataLoaded(true);
          },
        });
      });
  }, [walletAddress]);

  return { vestedAmount, dataLoaded };
};

export default useVestedMuon;
