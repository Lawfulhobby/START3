'use server';
import LanguageOptions from "./language_options";
import WalletConnect from "./wallet-connect";
import WalletCreation from "./wallet-creation";

export async function ServerSideWallet({
    question,
}: {
    question: number;
}) {

    const renderQuestion = () => {
        switch (question) {
            case 1:
                return (
                    <LanguageOptions />
                );
            case 2:
                return (
                    <WalletCreation />
                );
            case 3:
                return (
                    <WalletConnect />
                );
            case 4:
                return (
                    <></>
                );
        }
    }

    return (
        <div>
            {renderQuestion()}
        </div>
    );
}