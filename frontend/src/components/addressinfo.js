
import React, { useState, useEffect } from "react"
import {Drawer, Button} from "antd"
import LeaseInfo from "./LeaseInfo"
import ReviewInfo from './ReviewInfo'

const AddressInfo = ({ location}) => {
    // const [visible, setVisible] = useState(false)

    // const showDrawer = () => {
    //   setVisible(true)
    // }
    
    // const onClose = () => {
    //   setVisible(false)
    // }

    // return (
    //     <>
    //         <Button onClick={showDrawer}>
    //             Open
    //         </Button>
    //         <Drawer
    //         title="Address"
    //         placement="right"
    //         closable={false}
    //         onClose={onClose}
    //         visible={visible}
    //         width={720}>
    //             <LeaseInfo lease = {lease}/>
    //         </Drawer>
    //     </>
    // )
    let counter = 0;

    return(
    <div>
        <h1>{location.address}</h1>
        <p>{location.lat} : {location.long}</p>
        <p>{location.avg_rating}</p>
        <>{location.leases.map( lease => {
            counter++;
            return(
                <>
                    <h2>Lease Number {counter}</h2>
                    <LeaseInfo key = {lease.name} lease = {lease}/>
                </>
            )})
        }</> 
        {counter = 0}
        <>{ location.reviews.map( review =>{
            counter++;
            return(
                <>
                    <h2>Review Number {counter}</h2>
                    <ReviewInfo key = {review.rating} review = {review}/>
                </>
            )})
        }</>
    </div>
    )
}

export default AddressInfo