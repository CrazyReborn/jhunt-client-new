import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}signin`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        if (typeof json.msg !== 'undefined') {
          navigate('/dashboard/applications');
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/signin');
      });
  });

  return (
    <LoadingSpinner />
  );
}
