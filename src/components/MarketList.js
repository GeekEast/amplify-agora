import React from 'react';
import { Loading, Card, Icon, Tag } from 'element-react';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';
import { listMarkets } from '../graphql/queries';
import { onCreateMarket } from '../graphql/subscriptions';
import Error from './Error';
import { Link } from 'react-router-dom';

const MarketList = ({ term, searchResults }) => {
	return (
		<Connect
			query={graphqlOperation(listMarkets)}
			subscription={graphqlOperation(onCreateMarket)}
			onSubscriptionMsg={(prevList, updatedItem) => {
				// 注意：这里的prevList其实是data部分，不包含loading和errors
				// shallow copy here
				let updatedList = { ...prevList };
				const updatedItems = [ updatedItem.onCreateMarket, ...prevList.listMarkets.items ];
				updatedList.listMarkets.items = updatedItems;
				return updatedList;
			}}
		>
			{({ data, loading, errors }) => {
				if (errors.length > 0) return <Error errors={errors} />;
				if (loading || !data.listMarkets) return <Loading fullscreen={true} />;
				let markets;
				let resDisplay;

				if (term === '') {
					markets = data.listMarkets.items;
					resDisplay = (
						<h2 className="header">
							<img
								src="https://icon.now.sh/store_mall_directory/527FFF"
								alt="Store Icon"
								className="large-icon"
							/>
							Markets
						</h2>
					);
				} else if (searchResults.length > 0) {
					markets = searchResults;
					resDisplay = (
						<h2 className="text-green">
							<Icon type="success" name="check" className="icon" />
							{searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for
							{' "' + term + '"'}
						</h2>
					);
				} else {
					markets = [];
					resDisplay = (
						<h2 className="text-green">
							<Icon type="success" name="check" className="icon" />
							0 result for
							{' "' + term + '"'}
						</h2>
					);
				}

				return (
					<React.Fragment>
						{resDisplay}

						{markets.map((market) => {
							return (
								<div key={market.id} className="my-2">
									{/* Display as Card Component */}
									<Card
										bodyStyle={{
											padding: '0.7em',
											display: 'flex',
											alighItems: 'center',
											justifyContent: 'space-between'
										}}
									>
										<div>
											{/* 这是一行 */}
											<span className="flex">
												{/* Market name  */}
												<Link className="link" to={`/markets/${market.id}`}>
													{market.name}
												</Link>

												{/* Number of Products*/}
												<span style={{ color: 'var(--darkAmazonOrange)' }}>
													{market.products.items ? market.products.items.length : 0}
												</span>

												{/* Shopping Cart */}
												<img src="https://icon.now.sh/shopping_cart/f60" alt="Shopping Cart" />
											</span>

											{/* Market Owner 换到下一行 */}
											<div style={{ color: 'var(--lightSquidInk)' }}>{market.owner}</div>
										</div>

										{/* Market tags */}
										<div>
											{market.tags &&
												market.tags.map((tag) => (
													<Tag key={tag} type="danger" className="mx-1">
														{tag}
													</Tag>
												))}
										</div>
									</Card>
								</div>
							);
						})}
					</React.Fragment>
				);
			}}
		</Connect>
	);
};

export default MarketList;
