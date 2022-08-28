import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import LoadingSpinner from '../LoadingSpinner';
import ApplicationDelete from './ApplicationDelete';
import ApplicationUpdateForm from './ApplicationUpdateForm';
import ErrorPopUp from './ErrorPopUp';
import CanvasJsReactComponent from '../../canvasjs.react';
import '../../styles/ApplicationDetailed.css';

const CanvasJsChart = CanvasJsReactComponent.CanvasJSChart;

export default function ApplicationDetailed() {
  const { id } = useParams();
  const { state } = useLocation();
  const { salaryAllAvg, salaryUsrAvg } = state;
  const [application, setApplication] = useState('');
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [gotErr, setGotErr] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_SERVER}applications/${id}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.application !== undefined) {
          setApplication(json.application);
          setLoaded(true);
        } else {
          setErrors(json.err.errors);
          setLoaded(true);
        }
      })
      .catch((err) => setErrors([err]))
      .finally(() => {
        if (errors.length > 0) {
          setGotErr(true);
        } else {
          setGotErr(false);
        }
      });
  }, [updating]);

  const chartOptions = {
    title: {
      text: 'Salary comparison',
    },
    data: [{
      type: 'bar',
      dataPoints: [
        { y: application.salary, label: 'This' },
        { y: application.salary, label: 'This' },
      ],
    }, {
      type: 'bar',
      dataPoints: [
        { y: Math.round(salaryAllAvg), label: 'All Users Applications' },
        { y: Math.round(salaryUsrAvg), label: 'All Of Your Applications' },
      ],
    },
    ],
  };

  return (
    loaded
      ? (
        <div className="container-detailed">
          <article className="detailed">
            <h2>
              {'Company: '}
              {application.company_name}
            </h2>
            <p>
              {'Position: '}
              {application.position}
            </p>
            <p>
              {'Salary: '}
              {application.salary}
              PLN per month
            </p>
            <p>
              {'Status: '}
              {application.status}
            </p>
            <p>
              {'Date: '}
              {typeof application.date === 'undefined'
                ? ''
                : format(parseISO(application.date), 'yyyy-MM-dd')}
            </p>
            <p>
              <a
                href={application.jobLink}
                target="_blank"
                rel="noreferrer"
              >
                Job link
              </a>
            </p>
            <p>
              {'Qualifications: '}
              {application.qualifications_met}
            </p>
            <div className="application-btns">
              <button
                className="btn-update"
                type="button"
                onClick={() => setUpdating(true)}
              >
                Update
              </button>
              <ApplicationDelete application={application} />
            </div>
            <ApplicationUpdateForm
              updating={updating}
              setUpdating={setUpdating}
              application={application}
            />
            <ErrorPopUp errors={errors} gotErr={gotErr} setGotErr={setGotErr} />
          </article>
          <CanvasJsChart className="chart" options={chartOptions} />
        </div>
      )
      : <LoadingSpinner />
  );
}
