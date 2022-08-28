import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}signout`, {
      method: 'POST',
      credentials: 'include',
    }).then((res) => res.json())
      .then((json) => {
        if (typeof json.msg !== 'undefined') {
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  });
  return (
    <p>logout</p>
  );
}
