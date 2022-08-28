import React from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as CloseLogo } from '../../images/close_black_24dp.svg';
import '../../styles/ErrorPopUp.css';

export default function ErrorPopUp({ gotErr, setGotErr, errors }) {
  if (!gotErr) return null;
  return ReactDOM.createPortal(
    <div className="error-pop-up-container">
      <div className="error-pop-up-content">
        <CloseLogo className="close-err-msg" onClick={() => setGotErr(false)} />
        <h1>Oops, there was an error!</h1>
        <div>
          {Array.isArray(errors)
          && errors.map((err) => <p key={Date.now() + (Math.random() * 10)}>{err.msg}</p>)}
        </div>
      </div>
    </div>,
    document.getElementById('portal'),
  );
}
