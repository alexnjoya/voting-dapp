import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Voting", function () {
    async function deployVotingFixture() {
        // Contracts are deployed using the first voter/account by default
        const [owner, voter1, voter2, ec, candidate1] = await ethers.getSigners();

        const Voting = await ethers.getContractFactory("Voting");
        const voting = await Voting.deploy();

        //register EC
        await voting.registerEC
            (ec.address);



        // Register voter1 & voter2 as Voters
        await voting.connect(ec).registerVoter(voter1.address);
        await voting.connect(ec).registerVoter(voter2.address);

        // Add Candidate1
        await voting.connect(ec).addCandidate(candidate1.address, 'Candidate 1');


        return { voting, owner, voter1, voter2, candidate1 };
    }

    it("Should be able to vote", async function () {
        const { voting, owner, voter1, voter2, candidate1 } = await loadFixture(deployVotingFixture);

        const initialCandidate = await voting.candidates(candidate1.address);
        const initalTotalVotes = await voting.totalVotes();

        await voting.connect(voter1).vote(candidate1.address);

        const finalCandidate = await voting.candidates(candidate1.address);
        const finalTotalVotes = await voting.totalVotes();

        expect(finalCandidate.voteCount).to.equal(initialCandidate.voteCount + BigInt("1"));
        expect(finalTotalVotes).to.equal(initalTotalVotes + BigInt("1"));
    });
});