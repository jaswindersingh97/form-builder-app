import React from 'react'

function Buttons({array}) {
  return (
    <div>
      {array.map((item) =>{
        return(
            <button key={item.id}>{item.value}</button>
        )
      })}
    </div>
  )
}

export default Buttons
