/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import { ReactComponent as CloseLogo } from '../../images/close_black_24dp.svg';
import ErrorPopUp from './ErrorPopUp';

export default function ApplicationUpdateForm({
  application,
  updating,
  setUpdating,
}) {
  const [companyName, setCompanyName] = useState(application.company_name);
  const [position, setPosition] = useState(application.position);
  const [salary, setSalary] = useState(application.salary);
  const [status, setStatus] = useState(application.status);
  const [location, setLocation] = useState(application.location);
  const [date, setDate] = useState(format(parseISO(application.date), 'yyyy-MM-dd'));
  const [jobLink, setJobLink] = useState(application.jobLink);
  const [qualificationsMet, setQualificationsMet] = useState(application.qualifications_met);
  const [errors, setErrors] = useState([]);
  const [gotErr, setGotErr] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_SERVER}applications/${application._id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName,
        position,
        salary,
        status,
        location,
        jobLink,
        date,
        qualificationsMet,
      }),
    }).then((res) => res.json())
      .then((json) => {
        if (typeof json.msg !== 'undefined') {
          setUpdating(false);
        } else {
          setErrors(json.err.errors);
        }
        setGotErr(errors.length > 0);
      })
      .catch((err) => setErrors(err));
  };

  if (updating === false) return null;
  return ReactDOM.createPortal(
    <div className="new-application-container">
      <form className="new-application" onSubmit={(e) => onSubmit(e)}>
        <div className="sub-container">
          <h3>Update application</h3>
          <CloseLogo className="new-application-close" onClick={() => setUpdating(false)} />
        </div>
        <label htmlFor="companyName">
          Company Name
          <input autoComplete="off" type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </label>
        <label htmlFor="position">
          Position
          <input autoComplete="off" type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} />
        </label>
        <label htmlFor="salary">
          Salary
          <input autoComplete="off" type="number" id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
        </label>
        <label htmlFor="status">
          Status
          <select defaultValue={status} id="status" onChange={(e) => setStatus(e.target.value)}>
            <option value={null}>--Please select an option--</option>
            <option value="Application sent">Application sent</option>
            <option value="No answer">No answer</option>
            <option value="No offer">No offer</option>
            <option value="Phone call">Phone call</option>
            <option value="Interview">Interview</option>
            <option value="Offered">Offered</option>
          </select>
        </label>
        <label htmlFor="date">
          Select date
          <input autoComplete="off" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label htmlFor="location">
          Location
          <input autoComplete="off" type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label htmlFor="jobLink">
          Link to the offer:
          <input autoComplete="off" type="text" id="jobLink" value={jobLink} onChange={(e) => setJobLink(e.target.value)} />
        </label>
        <label htmlFor="qualificationsMet">
          Qualifications:
          <select defaultValue={qualificationsMet} id="qualificationsMet" onChange={(e) => setQualificationsMet(e.target.value)}>
            <option value={null}>--Please select an option--</option>
            <option value="Fully met">Fully met</option>
            <option value="Mostly met">Mostly met</option>
            <option value="Half are met">Half are met</option>
            <option value="Mostly unmet">Mostly unmet</option>
            <option value="Fully unmet">Fully unmet</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
        <ErrorPopUp errors={errors} gotErr={gotErr} setGotErr={setGotErr} />
      </form>
    </div>,
    document.getElementById('portal'),
  );
}
