import styled from "styled-components";

export const TitleContent = styled.div`
  text-align: center;
  font: normal normal bold 26px/1.4em 'courier new',courier-ps-w01,courier-ps-w02,courier-ps-w10,monospace;
`

export const ImgBlockText = styled(TitleContent)`
  width: 350px;
`;

export const ImgBlock = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

export const ListPeopleBlock = styled(TitleContent)`
  width: 100%;
`;

export const ButtonStart = styled.button`

  @media (min-width: 768px) {

      width: 200px;
      height: 86px;
      line-height: 88px;

  }
    width: 150px;
    height: 76px;
    line-height: 78px;
    font-size: 20px;
    font-family: 'Bebas Neue', sans-serif;
    background: linear-gradient(45deg, transparent 5%, #FF013C 5%);
    border: 0;
    color: #fff;
    letter-spacing: 3px;
    box-shadow: 6px 0px 0px #00E6F6;
    outline: transparent;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  

 :after {
    --slice-0: inset(50% 50% 50% 50%);
    --slice-1: inset(80% -6px 0 0);
    --slice-2: inset(50% -6px 30% 0);
    --slice-3: inset(10% -6px 85% 0);
    --slice-4: inset(40% -6px 43% 0);
    --slice-5: inset(80% -6px 5% 0);

    content: 'ALTERNATE TEXT';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00E6F6 5%, #FF013C 5%);
    text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #00E6F6;
    clip-path: var(--slice-0);
  }

  :hover:after {
    animation: 1s glitch;
    animation-timing-function: steps(2, end);
  }

  @keyframes glitch {
    0% {
      clip-path: var(--slice-1);
      transform: translate(-20px, -10px);
    }
    10% {
      clip-path: var(--slice-3);
      transform: translate(10px, 10px);
    }
    20% {
      clip-path: var(--slice-1);
      transform: translate(-10px, 10px);
    }
    30% {
      clip-path: var(--slice-3);
      transform: translate(0px, 5px);
    }
    40% {
      clip-path: var(--slice-2);
      transform: translate(-5px, 0px);
    }
    50% {
      clip-path: var(--slice-3);
      transform: translate(5px, 0px);
    }
    60% {
      clip-path: var(--slice-4);
      transform: translate(5px, 10px);
    }
    70% {
      clip-path: var(--slice-2);
      transform: translate(-10px, 10px);
    }
    80% {
      clip-path: var(--slice-5);
      transform: translate(20px, -10px);
    }
    90% {
      clip-path: var(--slice-1);
      transform: translate(-10px, 0px);
    }
    100% {
      clip-path: var(--slice-1);
      transform: translate(0);
    }
  }
`
export const ImgContent = styled.img`
  max-width: 100px;
`;