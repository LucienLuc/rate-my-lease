
import React, { useState, useEffect } from "react"
import {Rate} from 'antd'

import LeaseInfo from "./LeaseInfo"
import ReviewInfo from './ReviewInfo'
import PostReview from './PostReview'
import PostLease from './PostLease'
import './reviewinfo.css'


const AddressInfo = ({location}) => {
    return(
    <div>
        <h1>{location.address} <Rate allowHalf disabled defaultValue={location.avg_rating}/> ({location.reviews.length})</h1>
        
        <h2> Leases </h2>
        <PostLease location={location}/>
        <LeaseInfo leases = {location.leases}/>
        <br></br>
        <h2> Reviews </h2>
        <PostReview location={location}/>
        <>{ location.reviews.map( review => {
            console.log(review);
            return(
                <ReviewInfo review = {review}/>
            )
        })}</> 
        
        
    </div>
    )
}

export default AddressInfo
