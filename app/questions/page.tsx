"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { questions, Question as QuestionType } from "./data";
//import Cookies from 'js-cookie';

const Page = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [questionName, setQuestionName] = useState<string | null>(null);

  const [answerRecord, setAnswerRecord] = useState<{
    chosenAnswer: string;
    isCorrect: boolean;
  } | null>(null);

  useEffect(() => {
    if (!questionName) {
      return;
    }
    /*
    // Load the 'answers' cookie
    const answersCookie = Cookies.get('answers');
    if (answersCookie) {
      try {
        const parsed: AnswerRecord = JSON.parse(answersCookie);
        if (parsed[questionName]) {
          setSelectedAnswer(parsed[questionName].chosenAnswer);
          setShowExplanation(true);
          setAnswerRecord(parsed[questionName]);
        }
      } catch (error) {
        console.error('Error parsing answers cookie:', error);
      }
    }
      */
  }, [questionName]);

  const question: QuestionType | undefined = questions.find(
    (q) => q.name.toLowerCase() === questionName?.toLowerCase()
  );

  // Error handling
  if (!questionName) {
    return (
      <div className="container mx-auto p-4">No question specified in URL.</div>
    );
  }

  if (!question) {
    return (
      <div className="container mx-auto p-4">
        Question "{questionName}" not found.
      </div>
    );
  }

  const handleAnswerClick = (answerId: string) => {
    const selectedAnswerObj = question.answers.find((a) => a.id === answerId);
    if (!selectedAnswerObj) return;

    const isCorrect = selectedAnswerObj.isCorrect;

    // Update selectedAnswer and showExplanation every time
    setSelectedAnswer(answerId);
    setShowExplanation(true);

    // Record only the first selection
    if (!answerRecord) {
      setAnswerRecord({ chosenAnswer: answerId, isCorrect });
      /*  
      // Update the cookie
      const answersCookie = Cookies.get('answers');
      let parsed: AnswerRecord = {};
      if (answersCookie) {
        try {
          parsed = JSON.parse(answersCookie);
        } catch (error) {
          console.error('Error parsing answers cookie:', error);
        }
      }
      // Add or update the record for the current question
      parsed[questionName] = { chosenAnswer: answerId, isCorrect };
      Cookies.set('answers', JSON.stringify(parsed), { expires: 365 }); // Expires in 1 year
*/
    }
    //update status, if clicked, then changed to correct; if not, stay pending.
    if (question.status === "pending") {
      question.status = isCorrect ? "correct" : "wrong";
    }
  };

  const getButtonStyle = (answer: any) => {
    const baseStyle =
      "w-full p-4 border rounded-lg text-left transition-colors";

    if (answer.id === selectedAnswer) {
      return `${baseStyle} ${
        answer.isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`;
    }

    return `${baseStyle} hover:bg-gray-50 hover:text-black`;
  };

  return (
    <div className="relative min-h-screen container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">{question.stem}</h1>

      <div className="space-y-4">
        {question.answers.map((answer) => (
          <button
            key={answer.id}
            className={getButtonStyle(answer)}
            onClick={() => handleAnswerClick(answer.id)}>
            <span className="font-bold mr-2">{answer.id}.</span>
            {answer.text}
          </button>
        ))}
      </div>

      {showExplanation && selectedAnswer && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold mb-2 text-gray-800">Explanation:</h3>
          <p className="text-gray-800 bg-gray-100 p-2 rounded">
            {question.answers.find((a) => a.id === selectedAnswer)?.explanation}
          </p>
        </div>
      )}

      {/* Back Button */}
      <Link
        href="/"
        className="fixed bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        aria-label="Back to Home">
        Back to Home
      </Link>
    </div>
  );
};

export default Page;
