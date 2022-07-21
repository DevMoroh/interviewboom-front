import React, { useEffect } from "react";
import { ButtonStart } from "../home";
import { startTestSession } from "../../test-flow/redux/slices/test-flow.slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";

export function StartTest({
  text,
  testId: testIdProp,
  startSessionImmediately = false,
}: {
  text: string;
  testId?: number;
  startSessionImmediately?: boolean;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const testId = testIdProp ?? undefined;

  const startSession = (testId?: number) => {
    dispatch(startTestSession({ testId: testId ?? 1 }))
      .unwrap()
      .then((data) => {
        navigate(`/testing/${data.id}`);
      });
  };
  useEffect(() => {
    if (testId && startSessionImmediately) {
      startSession(testId);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="button-content">
      <ButtonStart
        onClick={() => {
          startSession(testId);
        }}
      >
        {text}
      </ButtonStart>
    </div>
  );
}
