import React from 'react';
import NewMarket from '../components/NewMarket';
import MarketList from '../components/MarketList';
import { API, graphqlOperation } from 'aws-amplify';
import { searchMarkets } from '../graphql/queries';

const initState = {
	searchTerm: '',
	searchResults: [],
	isSearching: false
};
class HomePage extends React.Component {
	state = initState;

	onTermChange = (term) => {
		this.setState({ searchTerm: term });
	};

	handleSearch = async (event, term) => {
		try {
			event.preventDefault();
			this.setState({ isSearching: true });
			const input = {
				filter: {
					or: [ { name: { match: term } }, { owner: { match: term } }, { tags: { match: term } } ]
				},
				sort: {
					field: 'createdAt',
					direction: 'desc'
				}
			};
			// call the search api
			const results = await API.graphql(graphqlOperation(searchMarkets, input));
			this.setState({ searchTerm: term, searchResults: results.data.searchMarkets.items, isSearching: false });
		} catch (err) {
			console.error(err);
		}
	};

	handleClearSearch = () => {
		this.setState(initState);
	};

	render() {
		const { searchTerm, isSearching, searchResults } = this.state;
		return (
			<React.Fragment>
				{/* component to add new market */}
				<NewMarket
					term={searchTerm}
					isSearching={isSearching}
					onSearchTermChange={this.onTermChange}
					handleEnterSearch={this.handleSearch}
					handleClearSearch={this.handleClearSearch}
				/>
				{/* component to display all markets */}
				<MarketList term={searchTerm} searchResults={searchResults} />
			</React.Fragment>
		);
	}
}

export default HomePage;
