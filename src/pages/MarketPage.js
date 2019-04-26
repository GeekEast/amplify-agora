import React from 'react';
import { Loading, Tabs, Icon } from 'element-react';
import { API, graphqlOperation } from 'aws-amplify';
import { getMarket } from '../graphql/queries';
import { Link } from 'react-router-dom';

class MarketPage extends React.Component {
	state = {
		market: {},
		isLoading: true
	};

	componentDidMount = () => {
		this.getMarket();
	};

	getMarket = async () => {
		try {
			const marketId = this.props;
			const input = {
				id: marketId.marketId
			};
			const result = await API.graphql(graphqlOperation(getMarket, input));
			const market = result.data.getMarket;
			this.setState({ market, isLoading: false });
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { market, isLoading } = this.state;
		return isLoading ? (
			<Loading fullscreen={true} />
		) : (
			<React.Fragment>
				{/* Back Button */}
				<Link to="/" className="link">
					{' '}
					Back to market list
				</Link>
				{/* Market Meta Data */}

				<span className="items-center pt-2">
					<h2 className="mb-mr">{market.name}</h2>
					- {market.owner}
				</span>

				<div className="items-center pt2">
					<span style={{ color: 'var(--lightSquidInk)', paddingBottom: '1em' }}>
						<Icon name="date" className="icon" />
						{market.createdAt}
					</span>
				</div>
			</React.Fragment>
		);
	}
}

export default MarketPage;
