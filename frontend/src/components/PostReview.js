import React from "react"
import axios from 'axios'

import {Modal, Button, Form, Rate, Input, Divider, Spin} from "antd"
import {StarTwoTone} from "@ant-design/icons"
import { BASE_URL } from "../Constants";

class PostReview extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isModalVisible: false,
            ratingValue: undefined,
            loading: false
        }

        this.showModal = this.showModal.bind(this)
        this.toggle = this.toggle.bind(this)

        this.onFinish = this.onFinish.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleRatingChange = this.handleRatingChange.bind(this)
    }
    
    showModal() {
        this.setState({isModalVisible: true})
    }

    toggle(value) {
        this.setState({loading: value})
    }

    handleCancel() {
        this.setState({isModalVisible: false})
    }

    handleRatingChange(value) {
        this.setState({ratingValue: value})
    }

    onFinish(values) {
        this.toggle(true)
        const config = {
            address: this.props.location.address,
            reviews: {
                body: values.review_body,
                rating: values.rating
            }
        }

        axios
            .post(BASE_URL + '/api/review', config)
            .then(response => {
                console.log('review sent!')
                this.toggle(false)
                this.handleCancel()
                this.props.callback()
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
                    <Input disabled value ={this.props.location.address} addonBefore ={'Review for'}/>
                    <Divider/>
                    <Form
                        onFinish={this.onFinish}>
                        <Form.Item
                        name="rating"
                        style ={{position: 'relative', width: '100%', left: '37%',}}
                        rules={[{required: true, message: 'Please input a rating!'}]}>
                            <Rate allowHalf onChange = {e => this.handleRatingChange(e)}/>
                        </Form.Item>
                        <Input disabled value ={this.state.ratingValue} addonAfter ={<StarTwoTone  twoToneColor = "#FFDD33"/>} style = {{
                            position: 'relative',
                            left: '41%',
                            right: 'auto',
                            top: '-3px',
                            margin: '5px',
                            width: '18%'}}/>
                        <Form.Item
                        name="review_body"
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
                    <Spin spinning={this.state.loading}></Spin>
                </Modal>
            </div>
        )
    }
}

export default PostReview