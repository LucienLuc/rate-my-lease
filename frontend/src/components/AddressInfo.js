import React, { useState, useEffect } from "react"
import {Rate, Table, notification} from 'antd'
import axios from "axios"

import LeaseInfo from "./LeaseInfo"
import ReviewInfo from './ReviewInfo'
import PostReview from './PostReview'
import PostLease from './PostLease'
import './reviewinfo.css'

import {BASE_URL} from '../Constants'


const AddressInfo = ({location}) => {
    let isNewLocation = false
    let hasLease = true
    let hasReview = true

    if(location.reviews.length === 0 && location.leases.length === 0)
    {
        isNewLocation = true
    }

    if(location.reviews === undefined || location.reviews.length === 0)
    {
        hasReview = false
    }

    if(location.leases === undefined || location.leases.length === 0)
    {
        hasLease = false
    }

    const sentReview = () => {
        notification.open({
            message: 'Submitted review',
            duration: 4.5
        })
    }

    const sentLease = () => {
        notification.open({
            message: 'Submitted lease',
            duration: 4.5
        })
    }

    return(
    <>
        {isNewLocation &&
        <div>
            <h1> {location.address} </h1>

            <h2> Leases </h2>
            <p> There is no information yet. Be the first to make a lease!</p>
            <PostLease location={location} callback={sentLease} new={true}/>

            <h2> Reviews </h2>
            <p> There is no information yet. Be the first to leave a review!</p>
            <PostReview location={location} callback={sentReview} new={true}/>
        </div>
        }

        {!isNewLocation && !hasLease &&
        <div>
            <h1>{location.address} <Rate allowHalf disabled defaultValue={location.avg_rating}/> ({location.reviews.length})</h1>
            
            <h2> Leases </h2>
            <p> There is no information yet. Be the first to make a lease!</p>
            <PostLease location={location} callback={sentLease} new={false}/>
            <br></br>
            <h2> Reviews </h2>
            <PostReview location={location} callback={sentReview} new={false}/>
            <>{ location.reviews.map( review => {
                return(
                    <ReviewInfo review = {review}/>
                )
            })}</>
        </div>
        }

        {!isNewLocation && !hasReview &&
        <div>
            <h1>{location.address} <Rate allowHalf disabled defaultValue={location.avg_rating}/> ({location.reviews.length})</h1>
            
            <h2> Leases </h2>
            <PostLease location={location} callback={sentLease} new={false}/>
            <LeaseInfo leases = {location.leases}/>
            <br></br>
            <h2> Reviews </h2>
            <p> There is no information yet. Be the first to leave a review!</p>
            <PostReview location={location} callback={sentReview} new={false}/>
        </div>
        }

        {!isNewLocation && hasReview && hasLease &&
        <div>
        <h1>{location.address} <Rate allowHalf disabled defaultValue={location.avg_rating}/> ({location.reviews.length})</h1>
        
        <h2> Leases </h2>
        <PostLease location={location} callback={sentLease} new={false}/>
        <LeaseInfo leases = {location.leases}/>
        <br></br>
        <h2> Reviews </h2>
        <PostReview location={location} callback={sentReview} new={false}/>
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