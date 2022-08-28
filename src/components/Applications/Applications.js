/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ApplicationGeneral from './ApplicationGeneral';
import LoadingSpinner from '../LoadingSpinner';
import ErrorPopUp from './ErrorPopUp';
import '../../styles/Applications.css';

export default function Applications({ rerender }) {
  const [applications, setApplications] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [gotErr, setGotErr] = useState(false);
  const [salaryUsrAvg, setSalaryUsrAvg] = useState(0);
  const [salaryAllAvg, setSalaryAllAvg] = useState(0);

  function calculateAvgSalary() {
    const count = applications.length;
    let sum = 0;
    applications.forEach((e) => {
      sum += e.salary;
    });
    setSalaryUsrAvg(sum / count);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}applications`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.applications === undefined) {
          setErrors(json.err.errors);
        } else {
          setApplications(json.applications);
        }
        setSalaryAllAvg(json.averagesAll[0].avg);
        setGotErr(errors.length > 0);
      })
      .catch((err) => {
        setErrors(['There was an error while fetching data: ', err]);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [rerender]);

  useEffect(() => {
    calculateAvgSalary();
  }, [loaded]);

  if (loaded && applications.length > 0) {
    return (
      <div className="no-yet">
        <p>No applications have been added yet</p>
      </div>
    );
  }

  return (
    loaded
      ? (
        <>
          <div className="applications">
            <table className="application">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Salary</th>
                  <th className="table-head-date">Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.sort((prev, next) => (new Date(next.date) - new Date(prev.date)))
                  .map((application) => (
                    <ApplicationGeneral
                      key={application._id}
                      application={application}
                      salaryUsrAvg={salaryUsrAvg}
                      salaryAllAvg={salaryAllAvg}
                    />
                  ))}
              </tbody>
            </table>
          </div>
          <ErrorPopUp errors={errors} gotErr={gotErr} setGotErr={setGotErr} />
        </>
      )
      : <LoadingSpinner />
  );
}
