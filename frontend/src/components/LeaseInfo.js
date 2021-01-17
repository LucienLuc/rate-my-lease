import {Table} from "antd"

const LeaseInfo = ({leases}) => {
    //this func will be used to return information aboaut the lease

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: 'Date',
        dataIndex: 'date',
        key: 'date'
      }, {
        title: 'Price Listing',
        dataIndex: 'price',
        key: 'price'
      }, {
        title: 'Beds',
        dataIndex: 'bed',
        key: 'bed'
      }, {
        title: 'Baths',
        dataIndex: 'bath',
        key: 'bath'
      }, {
        title: 'Phone',
        dataIndex: 'contact/phone',
        key: 'contact/phone'
      }, {
        title: 'Email',
        dataIndex: 'contact/email',
        key: 'contact/email'
      }, {
        title: 'Description',
        dataIndex: 'body',
        key: 'body'
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
        <Table dataSource = {leases} columns = {columns}/>
      </div>
    )
  
  }

  export default LeaseInfo;