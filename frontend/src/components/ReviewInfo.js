import {Comment} from "antd"
const ReviewInfo = ({review}) => {


    return(
        <div className = "Comment">
            <Comment 
                datetime = {review.date}
                content = {review.body}
                author = {review.rating}
            />

        </div>
    )
}

export default ReviewInfo