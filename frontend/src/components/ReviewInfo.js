const ReviewInfo = ({key, review}) => {
    return(
        <div>
            <h3>  Review Info</h3>
            <p>     rating: {review.rating}</p>
            <p>     date:   {review.date}</p>
            <p>     {review.body}</p>
        </div>
    )
}

export default ReviewInfo