import React from "react";
import { ButtonStart } from "../home";
import { startTestSession } from "../../test-flow/redux/slices/test-flow.slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";

export function StartTest({ text }: { text: string }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const startSession = () => {
    dispatch(startTestSession({ testId: 1 }))
      .unwrap()
      .then((data) => {
        navigate(`/testing/${data.id}`);
      });
  };
  return (
    <div className="button-content">
      <ButtonStart
        onClick={() => {
          startSession();
        }}
      >
        {text}
      </ButtonStart>
    </div>
  );
}
