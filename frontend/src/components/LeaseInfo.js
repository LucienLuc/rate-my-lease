import {Table} from "antd"
import "./leaseinfo.css"

const LeaseInfo = ({leases}) => {
  leases.map(element => {
    const date = new Date(element.date);
    element.date = date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear();
    let str = '' + element.contact.phone;
    let match = str.match(/^(\d{3})(\d{3})(\d{4})$/);
    if(match){
      element.contact.phone = '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
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
      width : 200,
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

    return(
      <div>
        <Table className = 'allData' dataSource = {leases} columns = {columns} pagination={{ pageSize: 5 }}/>
      </div>
    )
  
  }

  export default LeaseInfo;