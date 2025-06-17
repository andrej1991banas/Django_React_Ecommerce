import React, { useState, useEffect } from 'react';
import UserData from '../plugin/user_data';
import apiInstance from '../../utils/axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { Line, Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';





function Earning() {
    const [earningStats, setEarningStats] = useState({})
    const [earningStatsTracker, setEraningStatTracker] = useState([])
    const [earnighChart, setEarningChart] = useState([])





    useEffect (() => {
        apiInstance.get(`vendor/earnings/${UserData()?.vendor_id}/`).then((res) => {
           setEarningStats(res.data [0]);
        })
    }, [])

    useEffect (() => {
        apiInstance.get(`vendor/monthly-earnings/${UserData()?.vendor_id}/`).then((res) => {
           setEraningStatTracker(res.data);
           setEarningChart(res.data)
          
        })
    }, [])


    // console.log(earningStats)


    const months = earnighChart?.map( item => item.month)
    const revenue = earnighChart?.map( item => item.total_earning)
    // console.log(revenue)
    // console.log(earnighChart)

    const revenue_data = {
        labels: months,
        datasets: [
            {
                label: "Total Sales Revenue",
                data: revenue,
                fill: true,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1
            }
        ]
    }



  return (
    <div>
        <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">


            <div className="col-md-9 col-lg-10 main mt-4">
            <div className="row mb-3">
                <div className="col-xl-6 col-lg-6 mb-2">
                <div className="card card-inverse card-success">
                    <div className="card-block bg-success p-3">
                    <div className="rotate">
                        <i className="bi bi-currency-dollar fa-5x" />
                    </div>
                    <h6 className="text-uppercase">Total Sales</h6>
                    <h1 className="display-1">${earningStats.total_revenue}</h1>
                    </div>
                </div>
                </div>
                <div className="col-xl-6 col-lg-6 mb-2">
                <div className="card card-inverse card-danger">
                    <div className="card-block bg-danger p-3">
                    <div className="rotate">
                        <i className="bi bi-currency-dollar fa-5x" />
                    </div>
                    <h6 className="text-uppercase">Monthly Earning</h6>
                    <h1 className="display-1">${earningStats.monthly_revenue}</h1>
                    </div>
                </div>
                </div>
            </div>
            <hr />
            <div className="row  container">
                <div className="col-lg-12">
                <h4 className="mt-3 mb-4">Revenue Tracker</h4>
                <table className="table">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">Month</th>
                        <th scope="col">Orders</th>
                        <th scope="col">Revenue</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {earningStatsTracker.map((e,index) => (

                        
                    <tr key={index}>
                        {e.month ===1 && <th scope="row">January</th>}
                        {e.month ===2 && <th scope="row">Fabruary</th>}
                        {e.month ===3 && <th scope="row">March</th>}
                        {e.month ===4 && <th scope="row">April</th>}
                        {e.month ===5 && <th scope="row">May</th>}
                        {e.month ===6 && <th scope="row">June</th>}
                        {e.month ===7 && <th scope="row">July</th>}
                        {e.month ===8 && <th scope="row">August</th>}
                        {e.month ===9 && <th scope="row">Septmeber</th>}
                        {e.monthe===10 && <th scope="row">October</th>}
                        {e.month ===11 && <th scope="row">November</th>}
                        {e.month ===12 && <th scope="row">December</th>}

                        
                        <td>{e.sales_count} Items Sold</td>
                        <td>${e.total_earning}</td>
                        <td>
                        <a href="" className="btn btn-primary mb-1">
                            <i className="fas fa-eye" />
                        </a>
                        </td>
                    </tr>
))}
                    </tbody>
                </table>
                </div>
                <div className="container">
                <div className="row ">
                    <div className="col">
                    <h4 className="mt-4">Revenue Analytics</h4>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-lg-6 py-1">
                        <div className="card">
                            <div className="card-body">
                                <Bar data={revenue_data} style = {{height:300}}/>
                            </div>
                        </div>
                    </div>
                {/* <div className="col-lg-6 py-1">
                    <div className="card">
                        <div className="card-body">
                            <Bar data={revenue_data} style = {{height:300}}/>
                        </div>
                    </div>
                </div> */}
                <div className="col-md-6 py-1">
                        <div className="card">
                            <div className="card-body">
                                
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Earning
