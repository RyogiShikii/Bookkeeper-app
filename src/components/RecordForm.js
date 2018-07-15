import React, { Component } from 'react';

export default class RecordForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          date:'',
          title:'',
          amount:''
      }
      this.handleChange = this.handleChange.bind(this);
    }
    
    valid(){
        return this.state.date && this.state.title && this.state.amount;
    }

    handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]:value});
    }

    render() {
    return (
        <form className='form-inline'>
            <div className="form-group">
                <input type="text" className="form-control" placeholder='Date' name='date' value={this.state.date} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder='Title' name='title' value={this.state.title} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder='Amount' name='amount' value={this.state.amount} onChange={this.handleChange}/>
            </div>
            <button type="submit" disabled={!this.valid()} className='btn btn-primary'>Create Record</button>
        </form>
    );
  }
}
