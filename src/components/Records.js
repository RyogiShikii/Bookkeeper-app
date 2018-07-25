import React, { Component } from 'react';
import Record from './Record';
import * as RecordsAPI from '../utils/RecordsAPI';
import RecordForm from './RecordForm'

class Records extends Component {
  constructor() {
    super();
    this.state = {
      error:null,
      isLoaded:false,
      records:[]
    }
    this.AddRecord = this.AddRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }
  
  componentDidMount(){
    RecordsAPI.getAll().then(
      response => this.setState({
        records:response.data,
        isLoaded:true
      })
    ).catch(
      error => this.setState({
        isLoaded:true,
        error:error
      })
    )
  }

  AddRecord(record){
    this.setState({
      error:null,
      isLoaded:true,
      records:[
        ...this.state.records,
        record
      ]
    });
  }

  updateRecord(oldData,neweData){
    const recordIndex = this.state.records.indexOf(oldData);
    const newRecords = this.state.records.map( (item, index) => {
      if(index !== recordIndex) {
          // This isn't the item we care about - keep it as-is
          return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return {
          ...item,
          ...neweData
      };    
    });
    this.setState({
      records:newRecords
    })
  }

  deleteRecord(removedData){
    const recordIndex = this.state.records.indexOf(removedData);
    const newRecord = this.state.records.filter( (item, index) => index !== recordIndex);
    this.setState(
      {records:newRecord}
    )
  }

  render() {
    const {error,isLoaded,records} = this.state;
    let recordsComponent;
  
    if(error){
      recordsComponent = <div>Error:{error.message}</div>
    }else if(!isLoaded){
      recordsComponent = <div>Loading...</div>
    }else{
      recordsComponent = (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map(item => (
              <Record  
                key={item.id} 
                record={item} 
                handleEditRecord={this.updateRecord}
                handleDeleteRecord={this.deleteRecord}
              />)
            )}
          </tbody>
        </table>
      );
    }
    return (
      <div>
        <h2>Records</h2>
        <RecordForm handleNewRecord={this.AddRecord}/>
        {recordsComponent}
      </div>
    );
  }
}

export default Records;
