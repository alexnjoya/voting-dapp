import { useEffect, useState } from "react";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import { voting } from "../contract";

function AddVoter() {
    const { ethereum } = useMetaMask();
    const [voterAddress, setVoterAddress] = useState("");

    const addVoter = async () => {
        if (ethereum) {
            // Get Access to Signer
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            // Make Function Call
            await voting.connect(signer).registerVoter(voterAddress);
        }
    }

    return (
        <div>
            <label>Enter Voter Address: <input onChange={event => setVoterAddress(event.target.value)} /></label>
            <button onClick={addVoter}>Add Voter</button>
        </div>
    );
}

export default AddVoter;