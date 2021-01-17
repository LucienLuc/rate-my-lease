import {Table} from "antd"
import "./leaseinfo.css"

const LeaseInfo = ({leases}) => {
    //this func will be used to return information aboaut the lease

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        className : 'columns'
      }, {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        className : 'columns'
      }, {
        title: 'Price Listing',
        dataIndex: 'price',
        key: 'price',
        className : 'columns'
      }, {
        title: 'Beds',
        dataIndex: 'bed',
        key: 'bed',
        className : 'columns'
      }, {
        title: 'Baths',
        dataIndex: 'bath',
        key: 'bath',
        className : 'columns'
      }, {
        title: 'Phone',
        dataIndex: 'contact/phone',
        key: 'contact/phone',
        className : 'columns'
      }, {
        title: 'Email',
        dataIndex: 'contact/email',
        key: 'contact/email',
        className : 'columns'
      }, {
        title: 'Description',
        dataIndex: 'body',
        key: 'body'
        ,className : 'columns'
      }
    ];


    // name: "Jiu",
    // date: Date(),
    // price: 2,
    // bed: 1,
    // bath: 1,
    // contact: {
    //     phone: 123123,
    //     email: "PushSubscription.gmail",
    // },
    // body: "body"

    return(
      <div>
        <Table className = 'allData' dataSource = {leases} columns = {columns}/>
      </div>
    )
  
  }

  export default LeaseInfo;