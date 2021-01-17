import React from "react"
import axios from 'axios'

import {Modal, Button, Form, Rate, Input} from "antd"
import {HomeOutlined, SearchOutlined, StarTwoTone} from "@ant-design/icons"

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
        console.log(values);
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Open
                </Button>
                <Modal 
                    title="Post a review" 
                    visible={this.state.isModalVisible} 
                    onCancel={this.handleCancel}
                    footer={[]}>
                    <Form
                        onFinish={this.onFinish}>

                        <Form.Item
                        name="rate">
                            <Rate allowHalf/>
                        </Form.Item>

                        <Form.Item
                        name="body">
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