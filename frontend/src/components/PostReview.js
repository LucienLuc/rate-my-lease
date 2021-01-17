import React from "react"
import axios from 'axios'

import {Modal, Button, Form, Rate, Input} from "antd"
import { BASE_URL } from "../Constants";

class PostReview extends React.Component {

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

    onFinish(values) {
        const config = {
            address: this.props.address,
            reviews: {
                body: values.body,
                rating: values.rating
            }
        }

        axios
            .post(BASE_URL + '/api/review', config)
            .then(response => {
                console.log('review sent!')
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Post a Review!
                </Button>
                <Modal 
                    title="Post a review" 
                    visible={this.state.isModalVisible} 
                    onCancel={this.handleCancel}
                    footer={[]}>
                    <Input disabled value ={'ADDRESS HERE'} addonBefore ={'Review for'}/>
                    <Form
                        onFinish={this.onFinish}>

                        <Form.Item
                        name="rating"
                        rules={[{required: true, message: 'Please input a rating!'}]}>
                            <Rate allowHalf/>
                        </Form.Item>

                        <Form.Item
                        name="body"
                        rules={[{required: true, message: 'Please input a review!'}]}>
                            <Input.TextArea placeholder="Write review here..." rows={7}/>
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

export default PostReview