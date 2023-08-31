import { useEffect, useState } from "react";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import { voting } from "../contract";

const candidates = [
    { name: "Jonadab", address: "0xF9e8D729c2724437209cDB24826b2a056B9fe84F" },
    { name: "Theodora", address: "0x088aa3af0804744bb10abB09D4F51F28bF88C70C" },
];

function Vote() {
    const { ethereum } = useMetaMask();
    const [candidateAddress, setCandidateAddress] = useState("");

    const vote = async () => {
        if (ethereum) {
            // Get Access to Signer
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            // Make Function Call
            console.log("Address: ", candidateAddress);
            await voting.connect(signer).vote(candidateAddress);
        }
    }

    return (
        <div>
            <select placeholder="Select Candidate" onChange={event => setCandidateAddress(event.target.value)}>
                <option selected disabled value="None">None</option>
                {candidates.map(candidate => <option key={candidate.address} value={candidate.address}>{candidate.name}</option>)}
            </select><br />
            <button onClick={vote}>Vote</button>
        </div>
    );
}

export default Vote;