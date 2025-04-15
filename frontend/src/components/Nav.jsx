import { Box, Typography } from '@mui/material'
import React from 'react'
import {naxData} from "../Constenst/data"
function Nav() {
  return (
    <div style={{marginTop:"80px"}}>
        
    <NavBar/>

    </div>
  )
}
function NavBar(){
    return <> 
        <Box sx={{display:"flex", justifyContent:"space-around",alignItems:"space-between",margin:"0 70px"}}>
          {naxData.map((obj,idx)=>(
            <Box sx={{padding:"0px 8px",textAlign:"center"}} key={idx}>
            <img src={obj.url} alt="nav" style={{width:"64px"}}/>
            <Typography sx={{fontWeight:600}}>{obj.text}</Typography>
            </Box>
          ))}
        </Box>
    </>
}



export default Nav