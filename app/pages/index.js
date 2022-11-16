import React from "react";
import dynamic from "next/dynamic"
import CandyMachine from "../components/CandyMachine";
import { useWallet } from "@solana/wallet-adapter-react"

const WalletMultiButton = dynamic(
    async () => 
        (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
        { ssr: false }
    );

// Constants
const TWITTER_HANDLE = "0xBartS";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const GITHUB_HANDLE = 'patrickballarano'
const GITHUB_LINK = `https://github.com/${GITHUB_HANDLE}`

const Home = () => {
    const wallet = useWallet();
    const [walletConnected, setWalletConnected] = React.useState(true);
    // Actions
    const renderNotConnectedContainer = () => (
        <div>
            <div className="button-container">
                <WalletMultiButton className="cta-button connect-wallet-button" />
            </div>
        </div>
    );

    const disconnectWallet = () => {
        wallet.disconnect();
        setWalletConnected(false);
        console.log('Wallet disconnected.');
    }

    const formatButtons = <div><p className="welcome-text">Hola Senōr</p><div className="button-container"><button className="dc-button connect-wallet-button" onClick={disconnectWallet}>Disconnect</button></div></div>;
    
    React.useEffect(() => {
        if (wallet.connected && walletConnected) {
            console.log("Phantom Wallet Found!");
            const hiddenKey = wallet.publicKey.toString().slice(wallet.publicKey.toString().length/2) + 'X'.repeat(wallet.publicKey.toString().length/2);
            console.log(`Public Key: ${hiddenKey}`);
        } else {
            setWalletConnected(true);
        }
    }, [wallet]);

    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    <p className="header">🍭 Candy Shop</p>
                    <p className="sub-text">NFT drop machine with fair mint</p>
                    <img src="https://media.giphy.com/media/eSwGh3YK54JKU/giphy.gif" alt="emoji" />
                    {/* Render your connect to wallet button right here */}
                    {wallet.publicKey ? <CandyMachine walletAddress={wallet} /> : renderNotConnectedContainer()}
                </div>

                <div className="footer-container">
                    <img alt="Twitter Logo" className="twitter-logo" src="/twitter-logo.svg" />
                    <a className="footer-text" href={TWITTER_LINK} target="_blank" rel="noreferrer">{`built by @${TWITTER_HANDLE}`}</a>
                </div>
                <div className="footer-two">
                    <img alt="Github Logo" className="github-logo" src="/github-logo.svg" />
                    <a className="footer-text" href={GITHUB_LINK} target="_blank" rel="noreferrer">{`built by @${GITHUB_HANDLE}`}</a>
                </div>
            </div>
        </div>
    );
};

export default Home;
