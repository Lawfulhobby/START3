'use server';
import LanguageOptions from "../wallet-creation/language_options";
import AmountTx from "./amount";

export async function ServerSideSendTx({
    question,
}: {
    question: number;
}) {

    const renderQuestion = () => {
        switch (question) {
            case 0:
                return (
                    <LanguageOptions />
                );
            case 1:
                return (
                    <LanguageOptions />
                );
            case 2:
                return (
                    <>
                        <AmountTx />
                    </>
                );
            case 3:
                return (
                    <>

                    </>
                );
            case 4:
                return (
                    <></>
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