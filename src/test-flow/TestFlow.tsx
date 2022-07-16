import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getAnswers,
  getNextQuestion,
  sendAnswers,
} from "./redux/slices/test-flow.slice";
import { Answer, Question } from "./redux/services/test-flow.service";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../components/spinner/Spinner";

const TestContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  max-width: 800px;
  padding: 0 15px 0 15px;
`;
const TestItem = styled.div`
  margin: 25px;
`;

const Label = styled.label`
  display: flex;
`;

const Input = styled.input`
  margin-right: 15px;
`;

const NextButton = styled.button`
  background: linear-gradient(45deg, transparent, #ff013c 0%);
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-size: 20px;
  width: 100px;
  height: 46px;
  outline: transparent;
`;

export function TestFlow() {
  const [question, setQuestion] = useState<Question>();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [counter, setCounters] = useState<{
    count: number;
    countAnswered: number;
  }>({ count: 0, countAnswered: 0 });
  const [checkedAnswerIds, setCheckedAnswerIds] = useState<number[]>([]);
  const { loading } = useAppSelector((state) => state.testFlow);

  const dispatch = useAppDispatch();
  const { sessionId } = useParams<{ sessionId?: string }>();
  const navigate = useNavigate();

  const getNext = (sessionId: string) => {
    dispatch(getNextQuestion(sessionId))
      .unwrap()
      .then(({ question, count, countAnswered }) => {
        if (count === countAnswered) {
          navigate(`/testing/${sessionId}/completed`);
        }

        setQuestion(question);
        setCounters((prevState) => {
          return { ...prevState, count, countAnswered };
        });
        return question;
      })
      .then(({ test_id, id }) => {
        return dispatch(
          getAnswers({ testId: test_id!, questionId: id! })
        ).unwrap();
      })
      .then((answers) => {
        setAnswers(answers);
        setCheckedAnswerIds([]);
      });
  };

  useEffect(() => {
    if (sessionId) {
      getNext(sessionId);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!question) {
    return null;
  }

  const onChecked = (answerId: number): boolean => {
    if (question.is_multiselect) {
      if (!checkedAnswerIds.includes(answerId)) {
        setCheckedAnswerIds((prev) => [...prev, answerId]);
        return true;
      }

      setCheckedAnswerIds((prev) => prev.filter((item) => item !== answerId));
      return false;
    }

    if (!checkedAnswerIds.includes(answerId)) {
      setCheckedAnswerIds([answerId]);
      return true;
    }

    setCheckedAnswerIds([]);
    return false;
  };

  const handleSendAnswers = () => {
    dispatch(
      sendAnswers({
        answerIds: checkedAnswerIds,
        questionId: question.id!,
        sessionId: sessionId!,
      })
    )
      .unwrap()
      .then(() => {
        return getNext(sessionId!);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <TestContent>
      <div>
        <div>
          <p>
            {counter.count} / {counter.countAnswered + 1}
          </p>
        </div>
        <div>
          <p>
            <b>{question.title}</b>
          </p>
        </div>
        <div>
          <p dangerouslySetInnerHTML={{ __html: question.question }} />
        </div>
      </div>
      <div>
        <ul>
          {answers.map((answer) => (
            <TestItem>
              <Label className="checkbox">
                <Input
                  type="checkbox"
                  onChange={() => onChecked(answer.id!)}
                  checked={checkedAnswerIds.includes(answer.id!)}
                />
                <i className="fa fa-2x icon-checkbox" />
                {answer.answer}
              </Label>
            </TestItem>
          ))}
        </ul>
      </div>
      <div>
        <NextButton onClick={() => handleSendAnswers()}>Done</NextButton>
      </div>
    </TestContent>
  );
}
