import Header from "./components/Header/Header";
import { Web3ModalProvider } from "./web3ModalProvider";
import { RefreshProvider } from "./context/Refresh/RefreshContext";
import Home from "./components/Home/Home";
import { Footer } from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { VestingProvider } from "./context/VestingContext";

function App() {
  document.getElementsByTagName("body")[0].className = "muon";
  return (
    <Web3ModalProvider>
      <RefreshProvider>
        <VestingProvider>
          <div className="app relative overflow-x-hidden flex flex-col no-scrollbar page__bg">
            <Header />

            <div className="flex-1 flex py-20 px-5">
              <Home />
            </div>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
        </VestingProvider>
      </RefreshProvider>
    </Web3ModalProvider>
  );
}

export default App;
