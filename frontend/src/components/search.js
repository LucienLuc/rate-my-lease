import React, {useState, useEffect, useRef} from "react"
import axios from 'axios'

import {Button, Form, Input, Rate, Select} from "antd"
import {HomeOutlined, SearchOutlined, StarTwoTone} from "@ant-design/icons"
import "./search.css"

import {BASE_URL} from '../Constants'
import {GOOGLE_API_KEY} from '../Constants'

import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Search = ({callback}) => {

    const [isAddressSearch, setAddressSearch] = useState(true)
    const [addressValue, setAddressValue] = useState(null);


    const onFinish = (values) => {
        // if get address is checked
        if(values.selection === 0)
        {
            
            if(values.address === '' || values.address === undefined)
            {
                axios
                    .get(BASE_URL + '/api/location-all')
                    .then(response => {
                        callback(response)
                    })
            }
            else
            {
                const config = {
                    params: {
                        address: values.address,
                        selection: values.selection
                    }
                }
                axios
                    .get(BASE_URL + '/api/location', config)
                    .then(response => {
                        callback(response)
                    })
            }
        }
        // otherwise, get lease
        else
        {
            const config = {
                params: {
                    address: values.address,
                    selection: values.selection,
                    min: values.min,
                    max: values.max,
                    beds: values.beds,
                    baths: values.baths,
                    rating: values.rating
                }
            }

            axios
                .get(BASE_URL + '/api/location', config)
                .then(response => {
                    callback(response)
                })
        }
    }

    const handleSelect = (value) => {
       setAddressSearch(value == 0 ? true : false)
    }

    return (
        <div className="search">
            <Form
            name="search"
            layout="horizontal"
            initialValues={{
                ["selection"]: 0,
                ["beds"]: -1,
                ["baths"]: -1,
                ["rating"]: -1
            }}
            onFinish={onFinish}>
                <Form.Item name = "selection" className = 'select'>
                    <Select onSelect = {handleSelect}>
                        <Select.Option value={0}>Search Addresses</Select.Option>
                        <Select.Option value={1}>Search Leases</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                className="address"
                name="address">
                    <Input size="default" placeholder="Address" value = {addressValue} onChange = {(e) => setAddressValue(e.target.value)} addonBefore={<HomeOutlined/>}/>
                </Form.Item>
                {!isAddressSearch &&
                <div>
                <Form.Item
                className="minPrice"
                name="min">
                    <Input size="default" placeholder="Min" addonBefore="$"/>
                </Form.Item>
                
                <Form.Item
                className="maxPrice"
                type="number"
                name="max">
                    <Input size="default" placeholder="Max" addonBefore="$"/>
                </Form.Item>

                <Form.Item
                className="beds"
                name="beds">
                    <Select>
                        <Select.Option value={-1}>All Beds</Select.Option>
                        <Select.Option value={1}>1 Bed</Select.Option>
                        <Select.Option value={2}>2 Bed</Select.Option>
                        <Select.Option value={3}>3 Bed</Select.Option>
                        <Select.Option value={4}>4 Bed</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                className="baths"
                name="baths">
                    <Select>
                        <Select.Option value={-1}>All Baths</Select.Option>
                        <Select.Option value={1}>1+ Baths</Select.Option>
                        <Select.Option value={2}>2+ Baths</Select.Option>
                        <Select.Option value={3}>3+ Baths</Select.Option>
                        <Select.Option value={4}>4+ Baths</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                className="rating"
                name="rating">
                        <Select suffixIcon = {<StarTwoTone twoToneColor = "#FFDD33"/>}>
                            <Select.Option value={-1}>All Ratings</Select.Option>
                            <Select.Option value={1}>1+</Select.Option> 
                            <Select.Option value={2}>2+</Select.Option>
                            <Select.Option value={3}>3+</Select.Option>
                            <Select.Option value={4}>4+</Select.Option>
                            <Select.Option value={5}>5+</Select.Option>
                        </Select>
                </Form.Item>
                </div>}
                <Form.Item
                className="button">
                    <Button icon={<SearchOutlined/>} htmlType="submit" className="button"/>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Search