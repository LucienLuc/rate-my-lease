import {Comment} from "antd"
const ReviewInfo = ({review}) => {
    const r_date = new Date(review.date);
    const now = new Date();
    let timeTag = "";

    //these time tags do not need to be here, they are simply outside the statements for  testing purposes
    const minDiff = now.getMinutes()-r_date.getMinutes() ;
    const secDiff = now.getSeconds()-r_date.getSeconds();
    const hourDiff = now.getHours()-r_date.getHours();
    const dayDiff = now.getDate()-r_date.getDate();
    const monthDiff = now.getMonth()-r_date.getMonth();
    const yearDiff = now.getFullYear()- r_date.getFullYear();

    console.log(review.date);
    console.log("review posted on: "+ new Date(review.date));
    console.log("now: " + now);
    console.log("time difference: "+ yearDiff+" years, " + monthDiff + "months, " + dayDiff + "days, " + hourDiff + "hours, " + minDiff + "minutes, " + secDiff + "seconds");


    if ( yearDiff > 0 ){
        //the year difference is a good size
        if(yearDiff == 1){
            timeTag = "" + yearDiff + " year ago";
        }else{
            timeTag = "" + yearDiff + " years ago";
        }

    }else if(monthDiff < 12 && monthDiff > 0){
        //the year difference is too small, month difference is a good size
        if(monthDiff == 1){
            timeTag = "" + monthDiff + " month ago";
        }else{
            timeTag = "" + monthDiff + " month ago";
        }
    
    }else if(dayDiff < 31 && dayDiff > 0){
        //the month diff was too small, day difference is a good size
        if(dayDiff == 1){
            timeTag = "" + dayDiff + " day ago";
        }else{
            timeTag = "" + dayDiff + " days ago";
        }


    } else if(hourDiff < 59 && hourDiff > 0){
        //the day difference was too small, we will use the hours because that is a good size
        if(hourDiff == 1){
            timeTag = "" + hourDiff + " hour ago";
        }else{
            timeTag = "" + hourDiff + " hours ago";
        }

    } else if(minDiff > 0){
        //the hour difference is too small, we use minute difference
        let minDiff = now.getMinutes() - r_date.getMinutes();
        if(minDiff == 1){
            timeTag = "" + minDiff + " minute ago";
        }else{
            timeTag = "" + minDiff + " minutes ago";
        }

    } else {
        //the minute difference was too small, so we will use the difference in seconds
        let secDiff = now.getSeconds()- r_date.getSeconds();
        if(secDiff == 1){
            timeTag = "" + secDiff + " second ago";
        }else{
            timeTag = "" + secDiff + " seconds ago";
        }

    }

    return(
        <div className = "Comment">
            <Comment 
                datetime = {timeTag} 
                content = {review.body}
                author = {review.rating}
            >
            
            </Comment>

        </div>
    )
}

export default ReviewInfo