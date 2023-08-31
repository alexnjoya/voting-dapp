import { useMetaMask } from "metamask-react";
import './App.css';
import AddEC from "./pages/AddEC";
import AddVoter from "./pages/AddVoter";
import AddCandidate from "./pages/AddCandidate";
import Vote from "./pages/Vote";

function App() {
  const { status, connect, account, chainId } = useMetaMask();

  if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>

  if (status === "unavailable") return <div>MetaMask not available :(</div>

  if (status === "notConnected") return <button onClick={connect}>Connect to MetaMask</button>

  if (status === "connecting") return <div>Connecting...</div>

  if (status === "connected") return (
    <div>
      <div>Connected account {account} on chain ID {chainId}</div>
      {/* Import Add EC Page */}
      <hr />
      <h3>Add EC</h3>
      <AddEC />
      <hr />
      <h3>Add Voter</h3>
      <AddVoter />
      <hr />
      <h3>Add Candidate</h3>
      <AddCandidate />
      <hr />
      <h3>Vote</h3>
      <Vote />
      <br /><br /><br />
    </div>
  )

  return null;
}

export default App;
