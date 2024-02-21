import React from 'react'
import "../User/home.css";
import { SearchOutlined } from '@ant-design/icons';
import { Button} from 'antd';

export default function AdminHome() {
  return (
    <div>
        <div className="black-box">
         <div className="blue-box">
            <div className="leaves">
              <h4>Incoming Documents</h4>
              <h4>0</h4>
            </div>
          </div>
          <div className="yellow-box">
            <div className="leaves">
              <h4>Pending Documents</h4>
              <h4>0</h4>
            </div>
          </div>
          <div className="green-box">
            <div className="leaves">
              <h4>Received Documents</h4>
              <h4>0</h4>  
            </div>
          </div>
          <div className="red-box">
            <div className="leaves">
              <h4>Ended Documents</h4>
              <h4>0</h4>  
            </div>
          </div>
       </div>
      
      <div className='table-container'>
        <table className="table table-bordered caption-top">
          <caption>List of Documents</caption>
            <thead className='table-dark'>
              <tr>
                <th scope="col">Doc Code</th>
                <th scope="col">Sender</th>
                <th scope="col">Details</th>
                <th scope="col">Date of Letter </th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>User</td>
                <td>this is </td>
                <td>21/12/2023</td>
                <td>Pending</td>
                <td> <Button type="primary" icon={<SearchOutlined />}>
                 view
                </Button></td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>User</td>
                <td></td>
                <td>13/12/2023</td>
                <td>Ended</td>
                <td> <Button type="primary" icon={<SearchOutlined />}>
                 view
                </Button></td>
              </tr>
            </tbody>
          </table>
      </div>
      
    </div>
  )
}
