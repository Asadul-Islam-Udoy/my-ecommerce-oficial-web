import React from 'react';
import './Charts.css';
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Chart from 'react-apexcharts'
function Charts() {
    const state = {
        options: {},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
      }
      const options= {
       chart: {
         id: "basic-bar"
       },
       xaxis: {
         categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
       }
     }
     const series= [
       {
         name: "series-1",
         data: [30, 40, 45, 50, 49, 60, 70, 91]
       }
     ]
   
  return (
        <>
         <div className='cricular__container'>
         <div className='donut__2'>
            <div className='name__chart__circal'><span>Users</span><CircularPlotUser/></div>
            <div className='name__chart__circal'><span>Orders</span><CircularPlotOrder/></div>
            <div className='name__chart__circal'><span>Products</span><CircularPlotProduct/></div>
           </div>
           <div className='donut__1'>
             <div className="donut__line">
                 <Chart className='line__plot' options={options} series={series} type="line"   />
               </div>
           </div>
           <div className='donut__1'>
             <div className="donut">
                 <Chart options={state.options} series={state.series} type="donut" width="380" />
               </div>
           </div>
        </div> 
        </>
      
  )
}

export default Charts

function CircularPlotUser() {
    const percentage = 12 ;
  return (
    <>
     <div className='cricular__container2'>
         <CircularProgressbar
              className='circularprogressbar'
              value={percentage}
               text={`${percentage}`}
               styles={buildStyles({
                rotation: 0.2,
                strokeLinecap: 'butt',
                 textSize: '14px',
                 pathTransitionDuration: 0.5,
                 pathColor: `rgba(2, 122, 199, ${percentage / 100})`,
                 textColor: 'red',
                 trailColor: '#d6d6d6',
                 backgroundColor: '#3e98c4',
                })}
             /> 
        </div> 
    </>
  )
}
function CircularPlotOrder() {
    const percentage = 6 ;
  return (
    <>
     <div className='cricular__container2'>
         <CircularProgressbar
              className='circularprogressbar'
              value={percentage}
               text={`${percentage}%`}
               styles={buildStyles({
                rotation: 0.2,
                strokeLinecap: 'butt',
                 textSize: '14px',
                 pathTransitionDuration: 0.5,
                 pathColor: `rgba(2, 122, 199, ${percentage / 100})`,
                 textColor: 'red',
                 trailColor: '#d6d6d6',
                 backgroundColor: '#3e98c4',
                })}
             /> 
        </div> 
    </>
  )
}
function CircularPlotProduct() {
    const percentage = 66 ;
  return (
    <>
     <div className='cricular__container2'>
         <CircularProgressbar
              className='circularprogressbar'
              value={percentage}
               text={`${percentage}%`}
               styles={buildStyles({
                rotation: 0.2,
                strokeLinecap: 'butt',
                 textSize: '14px',
                 pathTransitionDuration: 0.5,
                 pathColor: `rgba(2, 122, 199, ${percentage / 100})`,
                 textColor: 'red',
                 trailColor: '#d6d6d6',
                 backgroundColor: '#3e98c4',
                })}
             /> 
        </div> 
    </>
  )
}