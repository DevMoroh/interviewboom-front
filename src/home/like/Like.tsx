import React, {useState} from 'react'
import styled from "styled-components";
import {ImgBlockText, ImgContent, ListPeopleBlock, TitleContent} from "../../components/home";

const LikeContent = styled.div`
  display: flex;
  margin-top: 20px;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`

export function Like() {
    const [count, setCount] = useState(0)


    return (
        <LikeContent>
            <div>
                <a className="button" onClick={() => {
                    setCount(prev => (
                        ++prev
                    ))
                }} href="#popup1">
                    <ImgContent src={process.env.PUBLIC_URL + '/img/like.png'} alt="" />
                </a>
            </div>
            <div>
                <TitleContent>{count}</TitleContent>
            </div>
            <ImgBlockText>
                <p>
                    Please vote if you like the idea!
                </p>
            </ImgBlockText>
            <ListPeopleBlock>
                <p>People who already liked</p>
                <ul className="list-people">
                    <li>Maria</li>
                    <li>Nikolay</li>
                    <li>Roman</li>
                </ul>
            </ListPeopleBlock>
        </LikeContent>
    )
}