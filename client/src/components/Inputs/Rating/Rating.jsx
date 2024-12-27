import React from 'react'

function Rating() {
    const ratings = [1,2,3,4,5]
  return (
    <div>
    
      {
        ratings.map((item)=>{
        return <span key={item}> {item}</span>
        })
      }
    </div>
  )
}

export default Rating
