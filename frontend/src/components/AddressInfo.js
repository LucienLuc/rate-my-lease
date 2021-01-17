
import React, { useState, useEffect } from "react"
import LeaseInfo from "./LeaseInfo"
import ReviewInfo from './ReviewInfo'
import './reviewinfo.css'

const AddressInfo = ({location}) => {
    

    return(
    <div>
        <h1>{location.address}</h1>
        <h2> Average Rating: {location.avg_rating}</h2>
        <>{ location.reviews.map( review => {
            console.log(review);
            return(
                <ReviewInfo review = {review}/>
            )
        })}</> 
        
        <>
            <LeaseInfo leases = {location.leases}/>
        </>
    </div>
    )
}

export default AddressInfo
