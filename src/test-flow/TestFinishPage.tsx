import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StartTest } from "../components/start-testing/StartTest";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getTestReport } from "./redux/slices/test-flow.slice";
import { useParams } from "react-router-dom";
import { SessionQuestion } from "./redux/services/test-flow.service";
import { Spinner } from "../components/spinner/Spinner";

const FinishContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const TitleBlock = styled.div`
  text-align: center;
`;

const HeaderBlock = styled.div`
  text-align: center;
  padding: 0 10px;
`;

const WrongAnsweredBlock = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  max-width: 600px;
`;

const ItemQuestion = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
`;
const TextQuestion = styled.div`
  margin: 0;
`;

export function TestFinishPage() {
  const [resultQuestions, setResultQuestions] = useState<SessionQuestion[]>([]);
  const [testTitle, setTestTitle] = useState("");
  const [testId, setTestId] = useState<number>();

  const { loading } = useAppSelector((state) => state.testFlow);

  const [counters, setCounters] = useState<{
    count: number;
    correctAnswered: number;
  }>({ count: 0, correctAnswered: 0 });
  const dispatch = useAppDispatch();
  const { sessionId } = useParams<{ sessionId?: string }>();

  useEffect(() => {
    dispatch(getTestReport(sessionId!))
      .unwrap()
      .then(({ sessionQuestions, test, test_id }) => {
        if (!sessionQuestions) {
          return;
        }
        setTestId(test_id);
        setResultQuestions(sessionQuestions);
        setCounters({
          count: sessionQuestions.length,
          correctAnswered: sessionQuestions.filter(
            (question) => question.is_answered
          ).length,
        });
        setTestTitle(test);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const wrongAnsweredQuestions = resultQuestions
    .map((question, index) => {
      if (question.is_answered) {
        return null;
      }

      return (
        <ItemQuestion>
          <div style={{ marginRight: "10px" }}>
            <b>{index + 1}.</b>
          </div>
          <div>
            <TextQuestion>{question.question}</TextQuestion>
          </div>
        </ItemQuestion>
      );
    })
    .filter((question) => question);

  if (loading) {
    return <Spinner />;
  }

  return (
    <FinishContent>
      <HeaderBlock>
        <h1>{`Final result of "${testTitle}" test`}</h1>
      </HeaderBlock>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "24px" }}>
          Correct answered questions
          <br /> <b>{counters.correctAnswered}</b> from <b>{counters.count}</b>
        </p>
      </div>
      <div>
        <StartTest text="Try again" testId={testId} />
      </div>
      {wrongAnsweredQuestions.length > 0 ? (
        <WrongAnsweredBlock>
          <TitleBlock>
            <h3>Wrong answered questions:</h3>
          </TitleBlock>
          <ul>{wrongAnsweredQuestions}</ul>
        </WrongAnsweredBlock>
      ) : null}
    </FinishContent>
  );
}
