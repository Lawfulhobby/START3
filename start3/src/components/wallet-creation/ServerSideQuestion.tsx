'use server';
import QuestionEight from "./question_eight";
import QuestionEleven from "./question_eleven";
import QuestionFive from "./question_five";
import QuestionFour from "./question_four";
import QuestionNine from "./question_nine";
import QuestionOne from "./question_one";
import QuestionSeven from "./question_seven";
import QuestionSix from "./question_six";
import QuestionTen from "./question_ten";
import QuestionThree from "./question_three";
import QuestionTwo from "./question_two";

export async function ServerSideQuestion({
    question,
}: {
    question: number;
}) {

    const renderQuestion = () => {
        switch (question) {
            case 1:
                return (
                    <QuestionOne />
                );
            case 2:
                return (
                    <QuestionTwo />
                );
            case 3:
                return (
                    <QuestionThree />
                );
            case 4:
                return (
                    <QuestionFour />
                );
            case 5:
                return (
                    <QuestionFive />
                );
            case 6:
                return (
                    <>
                        <QuestionSix />
                    </>
                );
            case 7:
                return (
                    <>
                        <QuestionSeven />
                    </>
                );
            case 8:
                return (
                    <>
                        <QuestionEight />
                    </>
                );
            case 9:
                return (
                    <>
                        <QuestionNine />
                    </>
                );
            case 10:
                return (
                    <>
                        <QuestionTen />
                    </>
                );
            case 11:
                return (
                    <>
                        <QuestionEleven />
                    </>
                );
        }
    }

    return (
        <div>
            {/* Render the client-side UploadComponent with the userSession */}
            {renderQuestion()}
        </div>
    );
}