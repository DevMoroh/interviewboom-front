import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ImgBlockText,
  ImgContent,
  ListPeopleBlock,
  TitleContent,
} from "../../components/home";
import { getLikes, incrementLike } from "../redux/slices/like.slice";
import { useAppDispatch } from "../../app/hooks";
import { PopupLike } from "../../components/popup/PopupLike";
import { Like } from "../redux/services/like.service";

const LikeContent = styled.div`
  display: flex;
  margin-top: 20px;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;
const ListPeople = styled.div`
  max-height: 200px;
  overflow: scroll;
  color: grey;
  width: 100%;
  list-style: none;
`;

export function LikeComponent() {
  const [count, setCount] = useState(0);
  const [likes, setLikes] = useState<Like[]>([]);
  const [userName, setUserName] = useState("");
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLikes({ source: "promo" }))
      .unwrap()
      .then((data) => {
        setCount(data.count);
        setLikes(data.likes);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const incrementLikes = () => {
    dispatch(incrementLike({ source: "promo", username: userName }));
    setCount((prev) => ++prev);
  };

  return (
    <LikeContent>
      <div>
        <a className="button" onClick={() => setVisible(true)} href="#popup1">
          <ImgContent src={process.env.PUBLIC_URL + "/img/like.png"} alt="" />
        </a>
      </div>
      <div>
        <TitleContent>{count}</TitleContent>
      </div>
      <ImgBlockText>
        <p>Please vote if you like the idea!</p>
      </ImgBlockText>
      <ListPeopleBlock>
        <p>People who already liked</p>
        <ListPeople>
          {likes.map((like) => (
            <li>{like.username}</li>
          ))}
        </ListPeople>
      </ListPeopleBlock>

      {visible ? (
        <PopupLike
          onClose={() => setVisible(false)}
          onSend={() => {
            incrementLikes();
            setVisible(false);
          }}
          onChange={(value) => setUserName(value)}
        />
      ) : null}
    </LikeContent>
  );
}
