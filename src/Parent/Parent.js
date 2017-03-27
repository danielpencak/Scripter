/* eslint-disable no-unused-vars, arrow-parens, no-console, max-len, operator-linebreak */
import './Parent.css';
import React, { Component } from 'react';
import Header from '../Header/Header';
import LoginModal from '../LoginModal/LoginModal';
import SignupModal from '../SignupModal/SignupModal';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class Parent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginModalOpen: false,
      loginEmail: '',
      loginPassword: '',
      signupPassword: '',
      signupEmail: '',
      signupFirstName: '',
      signupLastName: '',
      signupBio: '',
      signupUserImage: '',
      signupConfirmPassword: '',
      signupModalOpen: false,
      userProjects: []
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.fetchUserProjects = this.fetchUserProjects.bind(this);
  }

  toggleModal({ target }) {
    this.setState({ [target.name]: !this.state[target.name] });
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    axios.post('/api/token', { email: this.state.loginEmail, password: this.state.loginPassword })
      .then(res => {
        const { id, firstName, lastName, image, bio } = res.data;

        this.setState({
          userId: id,
          firstName,
          lastName,
          loginModalOpen: false,
          loginEmail: '',
          loginPassword: '',
          userImage: image,
          userBio: bio
        });

        this.fetchUserProjects();
        browserHistory.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSignupSubmit() {
    axios.post('/api/users', {
      email: this.state.signupEmail,
      password: this.state.signupPassword,
      confirmPassword: this.state.signupConfirmPassword,
      firstName: this.state.signupFirstName,
      lastName: this.state.signupLastName,
      bio: this.state.signupBio,
      image: this.state.signupUserImage
    })
    .then(res => {
      const { id, firstName, lastName, image, bio } = res.data;

      this.setState({
        userId: id,
        userImage: image,
        firstName,
        lastName,
        signupModalOpen: false,
        signupEmail: '',
        signupPassword: '',
        signupConfirmPassword: '',
        userBio: bio
      });

      this.fetchUserProjects();
      browserHistory.push('/dashboard');
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleLogout() {
    axios.delete('/api/token')
      .then(res => {
        this.setState({
          userId: '',
          userImage: '',
          firstName: '',
          lastName: '',
          userProjects: []
        });

        browserHistory.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    axios.get('/api/users')
      .then(({ data }) => {
        const user = data;

        this.setState({
          userId: user.id,
          userImage: user.image,
          firstName: user.firstName,
          lastName: user.lastName
        });

        this.fetchUserProjects();
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetchUserProjects() {
    axios.get('/api/projects')
      .then(({ data }) => {
        const projects = data;

        this.setState({
          userProjects: projects
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="Parent">
        <Header
          userId={this.state.userId}
          toggleModal={this.toggleModal}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          handleLogout={this.handleLogout}
          fetchUserProjects={this.fetchUserProjects}
        />
        <div className="page">
          {React.cloneElement(this.props.children,
            {
              userId: this.state.userId,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              userProjects: this.state.userProjects,
              handleAddProjectSubmit: this.handleAddProjectSubmit,
              fetchUserProjects: this.fetchUserProjects
            })}
        </div>
        {
          this.state.loginModalOpen
          ?
          <LoginModal
            toggleModal={this.toggleModal}
            loginEmail={this.state.loginEmail} loginPassword={this.state.loginPassword} handleChange={this.handleChange} handleLoginSubmit={this.handleLoginSubmit} />
          : null
        }

        {
          this.state.signupModalOpen
          ?
          <SignupModal
            toggleModal={this.toggleModal}
            signupEmail={this.state.signupEmail} signupPassword={this.state.signupPassword} signupBio={this.state.signupBio} signupLastName={this.state.signupLastName} signupFirstName={this.state.signupFirstName} signupUserImage={this.state.signupUserImage} signupConfirmPassword={this.state.signupConfirmPassword} signupModalOpen={this.state.signupModalOpen} handleChange={this.handleChange} handleSignupSubmit={this.handleSignupSubmit} />
          : null
        }
      </div>
    );
  }
}
