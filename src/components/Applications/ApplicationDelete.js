/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorPopUp from './ErrorPopUp';

export default function ApplicationDelete(props) {
  const { application } = props;
  const [gotErr, setGotErr] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_SERVER}applications/${application._id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.msg !== undefined) {
          navigate('../applications/', { replace: true });
        } else {
          setErrors(json.err.errors);
          setGotErr(errors.length > 0);
        }
      })
      .catch((err) => {
        setErrors(err);
        setGotErr(errors.length > 0);
      });
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input className="btn-delete" type="submit" value="Delete" />
      <ErrorPopUp errors={errors} gotErr={gotErr} setGotErr={setGotErr} />
    </form>
  );
}
