import { ethers } from "ethers";
import ABI from "./abi.json";

const CONTRACT_ADDRESS = "0xE8C620b7B1c9130d261A123a4c8143EbB4996FBc";

export const voting = new ethers.Contract(CONTRACT_ADDRESS, ABI);