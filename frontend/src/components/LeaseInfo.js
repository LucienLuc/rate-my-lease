const LeaseInfo = ({key, lease}) => {
    //this func will be used to return information aboaut the lease
  
    return(
      <div>
        <h3>  Contact Info</h3>
        <p>     {lease.name}, {lease.contact.email}, {lease.contact.phone}</p>
        <h3>  Housing Info</h3>
        <p>     id: {lease._id}, loc: {lease.location}, date: {lease.date}, price: {lease.price}</p>
        <p>     be: {lease.bed}, ba: {lease.bath}, bd: {lease.body}, v: {lease.v}</p>
      </div>
    )
  
  }

  export default LeaseInfo;