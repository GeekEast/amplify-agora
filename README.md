### Initialize Environment
```sh
#  install packages
yarn install
#  initialize amplify 
amplify init
# add auth module
amplify add auth
# add GraphQL module
amplify add api
# add S3 hosting
amplify add hosting
```

### GraphQL Schema
```graphql
type Market @model @searchable {
	id: ID!
	name: String!
	products: [Product] @connection(name: "MarketProducts", sortField: "createdAt")
	tags: [String]
	owner: String!
	createdAt: String 
}

# here sub is better, because it's the unique id of a user
# By default, the owner field is identity and you could change this to another custom value like seller
type Product @model @auth(rules: [{ allow: owner, identityField: "sub" }]) {
	id: ID!
	description: String!
	market: Market @connection(name: "MarketProducts")
	file: S3Object!
	price: Float!
	shipped: Boolean!
	owner: String # this will be generated automatically according the auth rules, you could also add "seller" as ownerField for example
	createdAt: String
}

type S3Object {
	bucket: String!
	region: String!
	key: String!
}

type User
	@model(
		queries: { get: "getUser" }
		mutations: { create: "registerUser", update: "updateUser" }
		subscriptions: null
	) {
	id: ID!
	orders: [Order] @connection(name: "UserOrders", sortField: "createdAt")
}

type Order @model(
  queries: null, 
  mutations: { create: "createOrder" }, 
  subscriptions: null
  ) {
	id: ID!
	username: String!
	email: String!
	registered: Boolean # Once user registered, we set this field as true
	product: Product @connection # one-direction relationship
	user: User @connection(name: "UserOrders") # bi-direction relationship
	shippingAddress: ShippingAddress
	createdAt: String
}

type ShippingAddress @model {
	city: String!
	country: String!
	address_line1: String!
	address_state: String!
	address_zip: String!
}
```

### withAuthenticator
```javascript
export default withAuthenticator(App, {
                // Render a sign out button once logged in
                includeGreetings: true, 
                // Show only certain components
                authenticatorComponents: [MyComponents],
                // display federation/social provider buttons 
                federated: {myFederatedConfig}, 
                // customize the UI/styling
                theme: {myCustomTheme}});
// short cut
export default withAuthenticator(App, true, [MyComponents], {myFederatedConfig}, {myCustomTheme});        
``` 

### Custom Theme
- **Modification**:
  - Open Chrome **Inspect**
  - Click `little arrow` in the #483f3f corner
  - Play with the CSS attributes
- **Insight**:
  - use VSCode code prompt to see what attributes can you select
  - For example `...AmplifyTheme.button`
- **Limitations:**
  - You can only do some level of customization
```javascript
import { AmplifyTheme } from 'aws-amplify-react';
const theme = {
	...AmplifyTheme,
	button: {
		...AmplifyTheme.button,
		backgroundColor: '#f90'
	},
	sectionHeader: {
		...AmplifyTheme.sectionHeader,
		backgroundColor: '#f90',
		color: 'var(--color-secondary-accent)' // inherited form html in chrome inpect
	},
	navBar: {
		...AmplifyTheme.navBar,
		backgroundColor: '#ffc0cb'
	}
};
export default withAuthenticator(App, true, [], null, theme);
```

### Amplify Hub
- use Hub to listen to `remote` events and do callback `locally`
- set `user` state in App component to track `session` info 
```javascript
import { Hub } from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';

class App extends React.Component {
	state = {
		user: null
  };

 	componentDidMount = () => {
		Hub.listen('auth', this.onHubCapsule);
  };
  
	onHubCapsule = (info) => {
		const event = info.payload.event; // event name
		const user = info.payload.data; // user session
		if (event === 'signIn') this.setState({ user });
		if (event === 'signOut') this.setState({ user: null });
		console.log(event);
		console.log(user);
  };
  
	render() {
		const { user } = this.state;
		return !user ? <Authenticator theme={theme} /> : <Authenticator theme={theme} />;
	}
}
```

### Custom Navigation Bar
- pass sign out function to NavBar component
- pass username to NavBar component
```javascript
// App.js
onHandleSignOut = async () => {
		try {
			await Auth.signOut();
		} catch (err) {
			console.log(err);
		}
};

render() {
		const { user } = this.state;
		return !user ? (
			<Authenticator theme={theme} />
		) : (
			<Router>
				<React.Fragment>
					{/* NavBar */}
					<NavBar username={user.username} onHandleSignOut={this.onHandleSignOut} />
					{/* Routes */}
					<div className="app-container">
						<Route exact path="/" component={HomePage} />
						<Route path="/profile" component={ProfilePage} />
						<Route
							path="/markets/:marketId"
							component={({ match }) => <MarketPage marketId={match.params.marketId} />}
						/>
					</div>
				</React.Fragment>
			</Router>
		);
}

```
```javascript
// components/NavBar.js
import React from 'react';
import { Menu, Icon, Button } from 'element-react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ username, onHandleSignOut }) => (
	<Menu mode="horizontal" theme="dark" defaultActive="1">
		<div className="nav-container">
			{/* App Title / Icon */}
			<Menu.Item index="1">
				<NavLink to="/" className="nav-link">
					<span className="app-title">
						<img src="https://icon.now.sh/account_balance/f90" alt="App Icon" className="app-cion" />
						AmplifyAgora
					</span>
				</NavLink>
			</Menu.Item>
			{/* Navbar Items */}

			<div className="nav-items">
				{/* Welcome  */}
				<Menu.Item index="2">
					<span className="app-user">Welcome, {username}</span>
				</Menu.Item>

				{/* Profile */}
				<Menu.Item index="3">
					<NavLink to="/profile" className="nav-link">
						<Icon name="setting" />
						<span> Profile</span>
					</NavLink>
				</Menu.Item>

				{/* Sign Out */}
				<Menu.Item index="4">
					<Button type="warning" onClick={onHandleSignOut}>
						Sign Out
					</Button>
				</Menu.Item>
				<Menu.Item index="5" />
			</div>
		</div>
	</Menu>
);

export default Navbar;

```

### HomePage - Add New Market
- Dialog
  - Form
- User Context
- Tags
  - Select
### HomePage - Market List
- Connect
- Subscription

### HomePage - SearchBar
- Component Location
  
- State Management
  - Local Term
  - Remote Term
- Component
  - Form
  - Input
  - Button
- onTermChange
- handleSearch
- handleClearSearch
- isSearching
- Modify MarketList








## schema.graphql

```graphql
type Market @model @searchable {
  id: ID!
  name: String!
  products: [Product]
    @connection(name: "MarketProducts", sortField: "createdAt")
  tags: [String]
  owner: String!
  createdAt: String
}

type Product @model @auth(rules: [{ allow: owner, identityField: "sub" }]) {
  id: ID!
  description: String!
  market: Market @connection(name: "MarketProducts")
  file: S3Object!
  price: Float!
  shipped: Boolean!
  owner: String
  createdAt: String
}

type S3Object {
  bucket: String!
  region: String!
  key: String!
}

type User
  @model(
    queries: { get: "getUser" }
    mutations: { create: "registerUser", update: "updateUser" }
    subscriptions: null
  ) {
  id: ID!
  username: String!
  email: String!
  registered: Boolean
  orders: [Order] @connection(name: "UserOrders", sortField: "createdAt")
}

type Order
  @model(
    queries: null
    mutations: { create: "createOrder" }
    subscriptions: null
  ) {
  id: ID!
  product: Product @connection
  user: User @connection(name: "UserOrders")
  shippingAddress: ShippingAddress
  createdAt: String
}

type ShippingAddress {
  city: String!
  country: String!
  address_line1: String!
  address_state: String!
  address_zip: String!
}
```

## app.js

```javascript
var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
require("dotenv").config();
var stripe = require("stripe")("***");
var AWS = require("aws-sdk");

const config = {
  accessKeyId: "***",
  secretAccessKey: "***",
  region: "us-west-2",
  adminEmail: "***"
};

var ses = new AWS.SES(config);

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const chargeHandler = async (req, res, next) => {
  const { token } = req.body;
  const { currency, amount, description } = req.body.charge;

  try {
    const charge = await stripe.charges.create({
      source: token.id,
      amount,
      currency,
      description
    });
    if (charge.status === "succeeded") {
      req.charge = charge;
      req.description = description;
      req.email = req.body.email;
      next();
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const convertCentsToDollars = price => (price / 100).toFixed(2);

const emailHandler = (req, res) => {
  const {
    charge,
    description,
    email: { shipped, customerEmail, ownerEmail }
  } = req;

  ses.sendEmail(
    {
      Source: config.adminEmail,
      ReturnPath: config.adminEmail,
      Destination: {
      /* add customerEmail and ownerEmail to ToAddresses array after you've moved out of the sandbox for SES */ 
        ToAddresses: [config.adminEmail]
      },
      Message: {
        Subject: {
          Data: "Order Details - AmplifyAgora"
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
            <h3>Order Processed!</h3>
            <p><span style="font-weight: bold">${description}</span> - $${convertCentsToDollars(
              charge.amount
            )}</p>

            <p>Customer Email: <a href="mailto:${customerEmail}">${customerEmail}</a></p>
            <p>Contact your seller: <a href="mailto:${ownerEmail}">${ownerEmail}</a></p>

            ${
              shipped
                ? `<h4>Mailing Address</h4>
              <p>${charge.source.name}</p>
              <p>${charge.source.address_line1}</p>
              <p>${charge.source.address_city}, ${
                    charge.source.address_state
                  } ${charge.source.address_zip}</p>
              `
                : "Emailed product"
            }

            <p style="font-style: italic; color: grey;">
              ${
                shipped
                  ? "Your product will be shipped in 2-3 days"
                  : "Check your verified email for your emailed product"
              }
            </p>
            `
          }
        }
      }
    },
    (err, data) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({
        message: "Order processed successfully!",
        charge,
        data
      });
    }
  );
};

app.post("/charge", chargeHandler, emailHandler);

app.listen(3000, function() {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
```

### Insights:
- [React Fragment](https://www.jianshu.com/p/0c486b8f8b65): `<></>` used as empty div, can be very useful when wrapping components. **You should always use it when possible**
- Dialog: 页面内弹出元素用 true / false state 来控制显示于隐藏
### Resources:
- [Element React](https://github.com/ElemeFE/element-react)
- [Element React Docs](https://element.eleme.io/#/en-US/component/dialog)
- [Icon Now](https://icon.now.sh/)
  
### Question:
1. Where is the docs for element-react package?