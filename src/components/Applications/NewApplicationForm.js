import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as CloseLogo } from '../../images/close_black_24dp.svg';
import ErrorPopUp from './ErrorPopUp';
import '../../styles/newApplicationForm.css';

export default function NewApplicationForm({
  creatingNew, setCreatingNew, rerender, setRerender,
}) {
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [qualificationsMet, setQualificationsMet] = useState('');
  const [errors, setErrors] = useState([]);
  const [gotErr, setGotErr] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_SERVER}applications`, {
      method: 'POST',
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
        date,
        jobLink,
        qualificationsMet,
      }),
    }).then((res) => res.json())
      .then((json) => {
        if (typeof json.msg === 'undefined') {
          setErrors(json.err.errors);
        } else {
          setCompanyName('');
          setPosition('');
          setSalary('');
          setStatus('');
          setLocation('');
          setDate('');
          setJobLink('');
          setQualificationsMet('');
          setRerender(!rerender);
          setCreatingNew(false);
        }
        setGotErr(errors.length > 0);
      })
      .catch((err) => setErrors(err));
  };

  const onClick = () => {
    setCompanyName('');
    setPosition('');
    setSalary('');
    setStatus('');
    setLocation('');
    setDate('');
    setJobLink('');
    setQualificationsMet('');
    setCreatingNew(false);
  };

  if (!creatingNew) return null;
  return ReactDOM.createPortal(
    <div className="new-application-container">
      <form className="new-application" onSubmit={(e) => onSubmit(e)}>
        <div className="sub-container">
          <h3>Add new application</h3>
          <CloseLogo className="new-application-close" onClick={() => onClick()} />
        </div>
        <label htmlFor="companyName">
          Company Name
          <br />
          <input autoComplete="off" type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </label>
        <label htmlFor="position">
          Position
          <br />
          <input autoComplete="off" type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} />
        </label>
        <label htmlFor="salary">
          Salary
          <br />
          <input autoComplete="off" type="number" id="salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
        </label>
        <label htmlFor="status">
          Status
          <br />
          <select defaultValue={status} id="status" onChange={(e) => setStatus(e.target.value)}>
            <option value={null}>Click to select an option</option>
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
          <br />
          <input autoComplete="off" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label htmlFor="jobLink">
          Link to the offer:
          <br />
          <input autoComplete="off" type="text" id="jobLink" value={jobLink} onChange={(e) => setJobLink(e.target.value)} />
        </label>
        <label htmlFor="location">
          Location
          <br />
          <input autoComplete="off" type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label htmlFor="qualificationsMet">
          Qualifications:
          <br />
          <select defaultValue={qualificationsMet} id="qualificationsMet" onChange={(e) => setQualificationsMet(e.target.value)}>
            <option value={null}>Click to select an option</option>
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
