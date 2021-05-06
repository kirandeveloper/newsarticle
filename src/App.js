import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Pagination from "react-js-pagination";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      errors: null,
      activePage: 15
    };
  }

  getUsers() {
    axios
      .get("https://randomuser.me/api/?results=15")
      .then(response =>
        response.data.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          username: `${user.login.username}`,
          email: `${user.email}`,
          image: `${user.picture.thumbnail}`
        }))
      )
      .then(users => {
        this.setState({
          users,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { isLoading, users } = this.state;
    return (
      <React.Fragment>
        <section class="container-fluid">
        <h2>News</h2>
        <div class='row'>
          <div class='col-sm-3 mb-2 text-center'>
            Image
          </div>
          <div class='col-sm-3 mb-2 text-center'>
            Name
          </div>
          <div class='col-sm-3 mb-2 text-center'>
            EmailID
          </div>
        </div>
        <div>
          {!isLoading ? (
            users.map(user => {
              const { username, name, email, image } = user;
              return (
                <div key={username} class='container-fluid'>
                  
                  <div class='row'>
                    <div class='col-sm-3 mb-2'>
                      <img src={image} alt={name} />
                    </div>
                    <div class='col-sm-3 mb-2'>
                      {name}
                    </div>
                    <div class='col-sm-3 mb-2'>
                      {email}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
        </section>
      </React.Fragment>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));
export default App;
