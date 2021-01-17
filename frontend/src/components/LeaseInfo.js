import {Table} from "antd"
import "./leaseinfo.css"

const LeaseInfo = ({leases}) => {
  //console.log("jajajjajjajaja");
  //console.log(leases);
  leases.map(element => {
    const date = new Date(element.date);
    element.date = date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear();
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: 'Price Listing',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: 'Beds',
      dataIndex: 'bed',
      key: 'bed',
    }, {
      title: 'Baths',
      dataIndex: 'bath',
      key: 'bath',
    }, {
      title: 'Phone',
      dataIndex: ['contact','phone'],
      width : 90,
      key: 'contact/phone',
    }, {
      title: 'Email',
      dataIndex: ['contact','email'],
      width : 150,
      key: 'contact/email',
    }, {
      title: 'Description',
      dataIndex: 'body',
      width : 1000,
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
        <Table className = 'allData' dataSource = {leases} columns = {columns} pagination = {false}/>
      </div>
    )
  
  }

  export default LeaseInfo;