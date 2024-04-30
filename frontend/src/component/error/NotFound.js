import React from 'react'

function NotFound() {
  return (
    <div
    style={{
     minHeight:'100vh',
     display:'flex',
     alignItems:'center',
     justifyContent:'center',
     flexDirection:'column'
    }}
    >
      <h1 
       style={{
        fontSize:'100px',
        opacity:0.5
       }}
       >404</h1>
      <p
        style={{
            fontSize:'30px',
            marginTop:'-70px',
            color:'white',
            opacity:0.2
        }}
      >Page Not Found</p>
    </div>
  )
}

export default NotFound
