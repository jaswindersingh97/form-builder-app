import React from 'react'

function Video({video}) {
    // const link = "link"
  return (
    <div>
      <video width={400} controls>
        <source src={video} type='video/mp4' />
        Your browser doesn't support video. 
      </video>
    </div>
  )
}

export default Video
