import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as RecordAPI from '../utils/RecordsAPI'

export default class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit:false
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  handleEdit(e){
    e.preventDefault();
    const editedRecord = {
      date:this.refs.date.value,
      title:this.refs.title.value,
      amount:Number.parseInt(this.refs.amount.value,0)
    }
    RecordAPI.update(this.props.record.id,editedRecord).then(
      response => {
        this.props.handleEditRecord(this.props.record,response.data);
      },
      this.setState({edit:false})
    ).catch(
      error => console.log(error)
    )
  }

  handleDelete(e){
    e.preventDefault();
    RecordAPI.remove(this.props.record.id).then(
      response => {
        this.props.handleDeleteRecord(this.props.record)
      }
    ).catch(
      error => console.log(error.message)
    )
  }

  recordRow(){
    return (
      <tr>
          <td>{this.props.record.date}</td>
          <td>{this.props.record.title}</td>
          <td>{this.props.record.amount}</td>
          <td>
            <button className='btn btn-info mr-1' onClick={this.handleToggle}>Edit</button>
            <button className='btn btn-danger' onClick={this.handleDelete}>Delete</button>
          </td>
      </tr>
    );
  }

  recordForm(){
    return (
      <tr>
          <td><input type="text" className="form-control" defaultValue={this.props.record.date} ref='date'/></td>
          <td><input type="text" className="form-control" defaultValue={this.props.record.title} ref='title'/></td>
          <td><input type="text" className="form-control" defaultValue={this.props.record.amount} ref='amount'/></td>
          <td>
            <button className='btn btn-info mr-1' onClick={this.handleEdit}>Update</button>
            <button className='btn btn-danger' onClick={this.handleToggle}>Cancle</button>
          </td>
      </tr>
    );
  }

  handleToggle(){
    this.setState({
      edit:!this.state.edit
    })
  }

  render() {
    if(this.state.edit){
      return this.recordForm();
    }else{
      return this.recordRow();
    }
  }
}

Record.propTypes = {
  id:PropTypes.string,
  date:PropTypes.string,
  title:PropTypes.string,
  amount:PropTypes.number
}

