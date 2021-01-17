
import React, { useState, useEffect } from "react"
import {Rate, notification} from 'antd'
import axios from "axios"

import LeaseInfo from "./LeaseInfo"
import ReviewInfo from './ReviewInfo'
import PostReview from './PostReview'
import PostLease from './PostLease'
import './reviewinfo.css'

import {BASE_URL} from '../Constants'


const AddressInfo = ({location}) => {
    const [isNewLocation, setBool] = useState(false)

    if(location.reviews.length === 0 && location.leases.length === 0)
    {
        setBool(true)
    }

    const sentReview = () => {
        notification.open({
            message: 'Submitted review',
            duration: 4.5
        })
        // console.log(location.reviews);
        // location.reviews.push(value.reviews)
        // const config = {
        //     params:{
        //         address: location.address
        //     }
        // }
        // axios
        //     .get(BASE_URL + '/api/review', config)
        //     .then(response => {
        //         location.reviews = response.data
                
        //     })
    }

    const sentLease = () => {
        notification.open({
            message: 'Submitted lease',
            duration: 4.5
        })
       
        
        // const config = {
        //     params:{
        //         address: location.address
        //     }
        // }
        // axios
        //     .get(BASE_URL + '/api/location', config)
        //     .then(response => {
        //         location.leases = response.data.leases
        //     })
    }

    return(
    <>
        {!isNewLocation &&
        <div>
        <h1>{location.address} <Rate allowHalf disabled defaultValue={location.avg_rating}/> ({location.reviews.length})</h1>
        
        <h2> Leases </h2>
        <PostLease location={location} callback={sentLease}/>
        <LeaseInfo leases = {location.leases}/>
        <br></br>
        <h2> Reviews </h2>
        <PostReview location={location} callback={sentReview}/>
        <>{ location.reviews.map( review => {
            console.log(review);
            return(
                <ReviewInfo review = {review}/>
            )
        })}</>
        </div>}
    </>
    )
}

export default AddressInfo
