import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import Input from '../Input/Input';
import Check from '../../pictures/check.svg';
import { createProject } from '../../Actions/Database'; 

const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	className: '',
    	name: '',
      repository: '',
      trello: '',
      classes: 'submit-project',
      error: false,
    }
  }

  shouldComponentUpdate = (nextProps, {className, name, repository, trello, classes, error}) => {
  	const curState = this.state;
  	if(className !== curState.className) return true;
  	else if(name !== curState.name) return true;
  	else if(repository !== curState.repository) return true;
  	else if(trello !== curState.trello) return true;
  	else if(classes !== curState.classes) return true;
  	else if(error !== curState.error) return true;
  	return false;
  }

  inputChange = (name, value) => {
  	this.setState({[name]: value });
  }

  checkState = () => {
  	const { className, name, repository, trello } = this.state;
  	return className !== '' &&
  				 name !== '' &&
  				 repository !== '' &&
  				 trello !== '';
  }

  error = () => {
  	this.setState({ classes: 'submit-project', error: true });
  }

  submit = () => {
  	this.setState({ classes: 'submit-project submit-project-loading' }, () => {
  		const { className, name, repository, trello } = this.state;
	  	if(this.checkState()) {
	  		Axios.post(`${baseURL}/projects`, { className, name, repository, trello })
					.then(res => {
						console.log(res);
						if(typeof res.data === 'string') {
							this.error();
						} else {
							this.props.createProject(res.data.project);
							this.setState({ classes: 'submit-project submit-project-loading submit-project-complete'}, () => {
								setTimeout(() => this.setState({ classes: 'submit-project' }), 2000);
							});
						}
					})
					.catch(err => this.error());
		  } else {
		  	this.error();
		  }
  	});
  }

  render = () => {
  	const { className, name, repository, trello, classes, error } = this.state;
    return (
      <div 
        className="create-project">
        <div>
          <div className='title'>
          	<h1>Please answer a few questions about your project</h1>
          </div>
          <div className="questionaire">
          	<h2 data-num="1">Classification</h2>
          	<Input 
            	labelText='1) To which class does this project belong?'
            	type='text'
            	placeholder='Ex: Computer Science 1'
            	name='className'
            	value={className}
            	onChange={this.inputChange} />
          	<Input 
            	labelText='1) What is the name of this product?'
            	type='text'
            	placeholder='Ex: Project Manager'
            	name='name'
            	value={name}
            	onChange={this.inputChange} />
            <h2 data-num="2">Linked Accounts</h2>
            <Input 
            	labelText='1) What is the name of your github repository'
            	type='text'
            	placeholder='Ex: My-Repository'
            	name='repository'
            	value={repository}
            	onChange={this.inputChange} />
            <Input 
            	labelText='2) What is your trello board ID?'
            	subText='Where do I find this?'
            	type='text'
            	placeholder='Ex: 1d2gd34dasf5768'
            	name='trello'
            	value={trello}
            	onChange={this.inputChange} />
            {
              error && 
                <h2 data-num="X">Please check your inputs and try again</h2>
            }
            <button 
              className={classes} 
              onClick={this.submit}>
                Submit
                <img src={Check} alt="Configure new project" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { createProject })(CreateProject);