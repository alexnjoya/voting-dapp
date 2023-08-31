import { useEffect, useState } from "react";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import { voting } from "../contract";

function AddEC() {
    const { ethereum } = useMetaMask();
    const [ecAddress, setEcAddress] = useState("");
    const [currentEc, setCurrentEc] = useState("");

    useEffect(() => {
        const getEC = async () => {
            // Get Access to Provider
            const provider = new ethers.BrowserProvider(ethereum);
            // Make Function Call
            const ec = await voting.connect(provider).ec();
            setCurrentEc(ec);
        }

        getEC();
    }, []);

    const addEC = async () => {
        if (ethereum) {
            // Get Access to Signer
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            // Make Function Call
            await voting.connect(signer).registerEC(ecAddress);
        }
    }

    return (
        <div>
            <p>Current EC: {currentEc}</p>
            <label>Enter EC Address: <input onChange={event => setEcAddress(event.target.value)} /></label>
            <button onClick={addEC}>Add EC</button>
        </div>
    );
}

export default AddEC;