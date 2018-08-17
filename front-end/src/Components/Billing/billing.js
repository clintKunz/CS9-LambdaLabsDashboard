import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

export default class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthly: false,
      annual: false
    };
  }
  // onToken = token => {
  //   const promise = axios.post("http://localhost:4000/charge", {
  //     body: JSON.stringify(token)
  //   });
  //   promise.then(response => {
  //     response.json().then(data => {
  //       alert(`We are in business, ${data.email}`);
  //     });
  //   });
  // };

  onToken = token =>
    axios
      .post("http:localhost:4000/charge", {
        description: "test item",
        source: token.id,
        currency: "usd",
        amount: 9.99
      })
      .then(response => {
        response.json().then(data => {
          alert(`We are in business, ${data.email}`);
        });
      })
      .catch(error => {
        console.log("error");
      });

  onChange = event => {
    alert("hello");
    this.setState({
      [event.target.name]: !this.state.id
    });
  };

  onSubmit = event => {
    event.preventDefault();
    console.log("firing off", this.state, URL);
    //TODO code for stripe
  };

  render() {
    console.log("monthly", this.state.monthly);
    console.log("annually", this.state.annual);
    return (
      <div>
        <div>Choose Your Subscription</div>
        <div>
          <label htmlFor="monthly">1 Year Subscription - $9.99</label>

          <input
            name="monthly"
            id="monthly"
            type="checkbox"
            onClick={this.onChange}
          />
        </div>
        <div>
          <label htmlFor="annual">1 Year Premium Subscription - $29.99</label>
          <input name="annual" id="annual" type="checkbox" />
          // onChange=
          {this.onChange}
        </div>

        {/* <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_iCsQ37ZO7RVr0Kec4pweqCU5"
        /> */}
        <StripeCheckout
          name="test name"
          description="test item"
          amount="9.99"
          token={this.onToken("9.99", "test item")}
          currency="usd"
          stripeKey="pk_test_iCsQ37ZO7RVr0Kec4pweqCU5"
        />
      </div>
    );
  }
}
