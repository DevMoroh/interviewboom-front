import React from "react";

import styled from "styled-components";
import { LikeComponent } from "./like/Like";
import {
  ImgBlock,
  ImgBlockText,
  ImgContent,
  TitleContent,
} from "../components/home";

import { StartTest } from "../components/start-testing/StartTest";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export function Home() {
  return (
    <Content>
      <TitleContent>
        <h1>Hello world!</h1>
        <p>
          Interviewboom is a Rocket <br />
          that will take your brain into space <br /> and you will never want to
          go back!
        </p>
      </TitleContent>
      <LikeComponent />
      <ImgBlock>
        <div>
          <ImgContent src={process.env.PUBLIC_URL + "/img/js-img.png"} alt="" />
        </div>
        <ImgBlockText>
          <p>JavaScript express test 20 questions</p>
        </ImgBlockText>
      </ImgBlock>

      <StartTest text="start testing" />
    </Content>
  );
}
