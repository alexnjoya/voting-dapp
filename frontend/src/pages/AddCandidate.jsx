import { useEffect, useState } from "react";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import { voting } from "../contract";

function AddCandidate() {
    const { ethereum } = useMetaMask();
    const [candidateAddress, setCandidateAddress] = useState("");
    const [candidateName, setCandidateName] = useState("");

    const addCandidate = async () => {
        if (ethereum) {
            // Get Access to Signer
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            // Make Function Call
            await voting.connect(signer).addCandidate(candidateAddress, candidateName);
        }
    }

    return (
        <div>
            <label>Enter Candidate Address: <input onChange={event => setCandidateAddress(event.target.value)} /></label><br />
            <label>Enter Candidate Name: <input onChange={event => setCandidateName(event.target.value)} /></label><br />
            <button onClick={addCandidate}>Add Candidate</button>
        </div>
    );
}

export default AddCandidate;