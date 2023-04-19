import React from 'react'
import { CChart } from '@coreui/react-chartjs';
import './Mychart.css'

export default function Mychart() {
  return (
    <div className='chart'>
      <CChart
      style={{width:"100%",height:"20rem",maxHeight:"20rem"}}
  type="line" 
  data={{
    labels: ["Week 1","","","Week 2","","", "Week 3","","","Week 4",],
    datasets: [
      {
        label: "Guest",
        borderColor: "red",
        data: [40, 30, 10, 11, 20, 30, 39, 50, 60,70],
        tension:0.3,
        pointStyle:'false'
      },
      {
        label: "User",
        backgroundColor: "rgba(151, 187, 205, 0.2)",
        borderColor: "green",
        data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
        tension:0.3,
        pointStyle:false
      },
    ],
  }
  }
/>
    </div>
  )
}
