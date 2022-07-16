import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  opacity: 1;
`;

const Popup = styled.div`
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
  h2 {
    margin-top: 0;
    color: #333;
    font-family: Tahoma, Arial, sans-serif;
  }
  .close {
    position: absolute;
    top: 20px;
    right: 30px;
    transition: all 200ms;
    font-size: 30px;
    font-weight: bold;
    text-decoration: none;
    color: #333;
  }
  .close:hover {
    color: #06d85f;
  }
  .content {
    max-height: 30%;
    overflow: auto;
  }
  .input-name {
    border: 3px solid #000;
    border-radius: 5px;
    height: 50px;
    line-height: normal;
    color: #282828;
    display: block;
    width: 100%;
    box-sizing: border-box;
    user-select: auto;
    font-size: 16px;
    padding: 0 6px;
    padding-left: 12px;
  }
  .input-name:focus {
    border: 3px solid #5551ff;
  }
  .button-9 {
    appearance: button;
    backface-visibility: hidden;
    background-color: #405cf5;
    border-radius: 6px;
    border-width: 0;
    box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
      rgba(50, 50, 93, 0.1) 0 2px 5px 0, rgba(0, 0, 0, 0.07) 0 1px 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue",
      Ubuntu, sans-serif;
    font-size: 100%;
    height: 44px;
    line-height: 1.15;
    margin: 12px 0 0;
    outline: none;
    overflow: hidden;
    padding: 0 25px;
    position: relative;
    text-align: center;
    text-transform: none;
    transform: translateZ(0);
    transition: all 0.2s, box-shadow 0.08s ease-in;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100%;
  }
  .button-9:disabled {
    cursor: default;
  }

  .button-9:focus {
    box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
      rgba(50, 50, 93, 0.2) 0 6px 15px 0, rgba(0, 0, 0, 0.1) 0 2px 2px 0,
      rgba(50, 151, 211, 0.3) 0 0 0 4px;
  }
  .title-block {
    display: flex;
  }
  .title-block-item {
    margin-left: 5px;
    margin-right: 5px;
  }
  .close-item {
    width: 35px;
  }
  @media screen and (max-width: 700px) {
    width: 70%;
    .title {
      width: 80%;
    }
  }
`;

export function PopupLike({
  onSend,
  onChange,
  onClose,
}: {
  onSend: () => void;
  onChange: (text: any) => void;
  onClose: () => void;
}) {
  // const [visible, setVisible] = useState(false)

  return (
    <Overlay>
      <Popup>
        <div className="title-block">
          <div className="title-block-item title">
            <h2>Tell us your name and click "Send"</h2>
          </div>
          <div
            onClick={() => onClose()}
            className="title-block-item close-item"
          >
            <button className="close">&times;</button>
          </div>
        </div>
        <div className="content">
          <input
            onChange={(event) => onChange(event.target.value)}
            type="text"
            className="input-name"
            placeholder="input your name"
          />

          <button onClick={onSend} className="button-9">
            Send like
          </button>
        </div>
      </Popup>
    </Overlay>
  );
}
