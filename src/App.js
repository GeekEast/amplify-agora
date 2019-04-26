import React from 'react';
import aws_exports from './aws-exports';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { Authenticator, AmplifyTheme } from 'aws-amplify-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MarketPage from './pages/MarketPage';
import NavBar from './components/Navbar';
import './App.css';

//  create User Context
export const UserContext = React.createContext();

Amplify.configure(aws_exports);

class App extends React.Component {
	state = {
		user: null
	};

	componentDidMount = () => {
		this.getUserData();
		Hub.listen('auth', this.onHubCapsule);
	};

	getUserData = async () => {
		try {
			const user = await Auth.currentAuthenticatedUser();
			this.setState({ user });
		} catch (err) {
			this.setState({ user: null });
		}
	};

	onHubCapsule = (info) => {
		const event = info.payload.event; // event name
		const user = info.payload.data; // user session
		if (event === 'signIn') this.setState({ user });
		if (event === 'signOut') this.setState({ user: null });
	};

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
			// broadcast user in User Context
			<UserContext.Provider value={{ user }}>
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
			</UserContext.Provider>
		);
	}
}

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

// export default withAuthenticator(App, true, [], null, theme);
export default App;
