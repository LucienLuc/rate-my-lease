import React from "react"
import axios from 'axios'

import {Modal, Button, Form, Input, InputNumber} from "antd"
import { BASE_URL } from "../Constants";

class PostLease extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isModalVisible: false
        }

        this.showModal = this.showModal.bind(this)

        this.onFinish = this.onFinish.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    
    showModal() {
        this.setState({isModalVisible: true})
    }

    handleCancel() {
        this.setState({isModalVisible: false})
    }
    //this.props.address
    onFinish(values) {
        const config = {
            address: "2477 Sycamore Ln, Davis, CA 95616",
            name: values.name,
            price: values.price,
            bed: values.bed,
            bath: values.bath,
            contact: {
                email: values.email,
                phone: values.number
            },
            body: values.body
        }

        axios
            .post(BASE_URL + '/api/lease', config)
            .then(response => {
                console.log('lease sent!')
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Open
                </Button>
                <Modal 
                    title="Post a lease" 
                    visible={this.state.isModalVisible} 
                    onCancel={this.handleCancel}
                    footer={[]}>
                    <Form
                        onFinish={this.onFinish}>

                        <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please input a name!'}]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                        name="price"
                        label="Price"
                        rules={[{required: true, message: 'Please input a price!'}]}>
                            <InputNumber formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/>
                        </Form.Item>

                        <Form.Item
                        name="bed"
                        label="Beds"
                        rules={[{required: true, message: 'Please input the number of beds!'}]}>
                            <InputNumber/>
                        </Form.Item>

                        <Form.Item
                        name="bath"
                        label="Baths"
                        rules={[{required: true, message: 'Please input the number of baths!'}]}>
                            <InputNumber/>
                        </Form.Item>

                        <Form.Item
                        name="email"
                        label="E-Mail"
                        rules={[{required: true, message: 'Please input an email!'}]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                        name="number"
                        label="Phone Number"
                        rules={[{required: true, message: 'Please input a phone number!'}]}>
                            <InputNumber/>
                        </Form.Item>

                        <Form.Item
                        name="body"
                        rules={[{required: true, message: 'Please input a body!'}]}>
                            <Input.TextArea placeholder="Write body here..." rows={7}/>
                        </Form.Item>

                        <div style = {{position: 'relative', bottom: '20px'}}>
                        <Form.Item style={{float: "right", margin: '5px', position: "relative"}}>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                            >
                                    Submit
                            </Button>
                        </Form.Item>

                        <Button 
                            danger 
                            onClick={this.handleCancel} 
                            style={{float: "right", margin: '5px', position: "relative"}}>
                                Cancel
                        </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default PostLease