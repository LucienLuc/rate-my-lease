import {Comment} from "antd"
const ReviewInfo = ({review}) => {


    return(
        <div>
            <Comment 
                datetime = {review.date}
                content = {review.body}
                author = {review.rating}
            />

        </div>
    )
}

export default ReviewInfo