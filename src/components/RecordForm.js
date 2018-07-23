import React, { Component } from 'react';
import * as ReactAPI from '../utils/RecordsAPI';

export default class RecordForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          date:'',
          title:'',
          amount:''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    valid(){
        return this.state.date && this.state.title && this.state.amount;
    }

    handleSubmit(e){
        e.preventDefault();
        const data = {
            date:this.state.date,
            title:this.state.title,
            amount:Number.parseInt(this.state.amount,0)
        }

        ReactAPI.create(data).then(
            response => {
                this.props.handleNewRecord(response.data);
                this.setState({
                    date:'',
                    title:'',
                    amount:''
                })
            }
        ).catch(
            error =>console.log(error.message)
        )
    }

    handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]:value});//
    }

    render() {
    return (
        <form className='form-inline mb-3' onSubmit={this.handleSubmit}>
            <div className="form-group">
                <input type="text" className="form-control mr-1" placeholder='Date' name='date' value={this.state.date} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control mr-1" placeholder='Title' name='title' value={this.state.title} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control mr-1" placeholder='Amount' name='amount' value={this.state.amount} onChange={this.handleChange}/>
            </div>
            <button type="submit" disabled={!this.valid()} className='btn btn-primary'>Create Record</button>
        </form>
    );
  }
}
