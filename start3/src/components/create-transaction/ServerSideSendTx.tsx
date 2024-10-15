'use server';
import BasenameComponent from "../tools/basename";
import InstagramComponent from "../tools/instagram";
import LanguageComponent from "../tools/language";
import LinkedInComponent from "../tools/LinkedIn";
import NumberTool from "../tools/number";
import SwapComponent from "../tools/swap";
import { TransactComponent } from "../tools/transact";
import TwitterComponent from "../tools/twitter";
import WalletComponent from "../tools/wallet";

export async function ServerSideSendTx({
    question,
}: {
    question: number;
}) {

    const renderQuestion = () => {
        switch (question) {
            case 0:
                return (
                    <></>
                );
            case 1:
                return (
                    <></>
                );
            case 2:
                return (
                    <NumberTool />
                );
            case 3:
                return (
                    <LanguageComponent />
                );
            case 4:
                return (
                    <WalletComponent />
                );
            case 5:
                return (
                    <TransactComponent />
                );
            case 6:
                return (
                    <SwapComponent />
                );
            case 7:
                return (
                    <BasenameComponent />
                );
            case 8:
                return (
                    <TwitterComponent />
                );
            case 9:
                return (
                    <InstagramComponent />
                );
            case 10:
                return (
                    <LinkedInComponent/>
                );
            default:
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