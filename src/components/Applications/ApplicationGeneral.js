/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export default function ApplicationGeneral(props) {
  const { application } = props;
  const { salaryUsrAvg } = props;
  const { salaryAllAvg } = props;
  const navigate = useNavigate();
  const moveToDetailed = () => {
    navigate(application._id, { state: { salaryUsrAvg, salaryAllAvg } });
  };

  return (
    <tr onClick={() => moveToDetailed()}>
      <td>{application.company_name}</td>
      <td>{application.position}</td>
      <td>{application.status}</td>
      <td>{application.salary}</td>
      <td className="table-body-date">{format(parseISO(application.date), 'yyyy-MM-dd')}</td>
    </tr>
  );
}
