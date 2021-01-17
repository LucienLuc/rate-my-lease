
import React, { useState, useEffect } from "react"
import LeaseInfo from "./LeaseInfo"
import ReviewInfo from './ReviewInfo'

const AddressInfo = ({location}) => {
    

    return(
    <div>
        <h1>{location.address}</h1>
        <p>{location.lat} : {location.long}</p>
        <p>{location.avg_rating}</p>
        <>
            <ReviewInfo reviews = {location.reviews}/>
        </> 
        
        <>
            <LeaseInfo leases = {location.leases}/>
        </>
    </div>
    )
}

export default AddressInfo