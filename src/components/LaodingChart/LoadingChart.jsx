import React from 'react'
import "./index.css"
function LoadingChart() {
  return (
    <div className='w-[20px] h-[20px] scale-[0.5] translate-x-[-10px]'>
      <span className="loader"></span>
    </div>
  )
}

export default LoadingChart
