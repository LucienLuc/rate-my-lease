import {Table} from "antd"
const ReviewInfo = ({reviews}) => {

    const columns = [{
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating'
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date'
    },
    {
        title: 'Review',
        dataIndex: 'review',
        key: 'review'
    }]

    return(
        <div>
            <Table dataSource={reviews} columns= {columns}/>
        </div>
    )
}

export default ReviewInfo