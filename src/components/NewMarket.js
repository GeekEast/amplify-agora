import React from 'react';
import { Form, Button, Dialog, Input, Select, Notification } from 'element-react';
import { API, graphqlOperation } from 'aws-amplify';
import { createMarket } from '../graphql/mutations';
import { UserContext } from '../App';

const initState = {
	addMarketDialog: false,
	marketName: null,
	tags: [ 'Arts', 'Technology', 'Crafts', 'Entertainment', 'Web Dev' ],
	selectedTags: [],
	options: [],
	term: ''
};

class NewMarket extends React.Component {
	state = initState;

	onNameChange = (name) => {
		this.setState({ marketName: name });
	};

	onTermChange = (term) => {
		this.setState({ term });
	};

	handleCreateMarket = async (user) => {
		try {
			const { marketName, selectedTags } = this.state;
			const input = {
				name: marketName,
				owner: user.username,
				tags: selectedTags
			};
			await API.graphql(graphqlOperation(createMarket, { input }));
			this.setState(initState);
		} catch (err) {
			Notification.error({
				title: 'Database Error',
				message: err.errors[0].message
			});
		}
	};

	handleFilterTags = (query) => {
		const options = this.state.tags
			.map((tag) => ({ value: tag, label: tag }))
			.filter((tag) => tag.label.toLowerCase().includes(query.toLowerCase()));
		this.setState({ options });
	};

	handleClearSearch = () => {
		this.setState({ term: '' });
		this.props.handleClearSearch();
	};

	render() {
		const { addMarketDialog, marketName, options, selectedTags, term } = this.state;
		return (
			// receive user in User Context
			<UserContext.Consumer>
				{({ user }) => (
					<React.Fragment>
						<div className="market-header">
							<h1 className="market-title">
								Create Your MarketPlace
								<Button
									type="text"
									icon="edit"
									className="market-title-button"
									onClick={() => this.setState({ addMarketDialog: true })}
								/>
							</h1>
							{/* Search Bar */}
							<Form inline={true} onSubmit={(event) => this.props.handleEnterSearch(event, term)}>
								<Form.Item>
									<Input
										placeholder="Search Marekts..."
										icon="circle-cross"
										onIconClick={this.handleClearSearch}
										onChange={(term) => this.onTermChange(term)}
										value={term}
									/>
								</Form.Item>

								<Form.Item>
									<Button
										type="info"
										icon="search"
										onClick={(event) => this.props.handleEnterSearch(event, term)}
										loading={this.props.isSearching}
									>
										Search
									</Button>
								</Form.Item>
							</Form>
						</div>

						<Dialog
							title="Create New Market"
							visible={addMarketDialog}
							onCancel={() => this.setState(initState)}
							customClass="dialog"
							size="large"
						>
							<Dialog.Body>
								<Form labelPosition="top">
									<Form.Item label="Add Market Name">
										<Input
											placeholder="Market Name"
											trim={true}
											onChange={this.onNameChange}
											value={marketName}
										/>
									</Form.Item>

									<Form.Item>
										<Select
											multiple={true}
											filterable={true}
											placeholder="Market Tags"
											onChange={(selectedTags) => {
												const sortedTags = selectedTags.sort((a, b) => {
													if (a < b) return -1;
													if (a > b) return 1;
													return 0;
												});
												this.setState({ selectedTags: sortedTags });
											}}
											remoteMethod={this.handleFilterTags}
											remote={true}
											value={selectedTags}
										>
											{options.map((option) => (
												<Select.Option
													key={option.value}
													value={option.value}
													label={option.label}
												/>
											))}
										</Select>
									</Form.Item>
								</Form>
							</Dialog.Body>

							<Dialog.Footer>
								<Button
									onClick={() => {
										this.setState(initState);
									}}
								>
									Cancel
								</Button>
								<Button
									type="primary"
									disabled={!this.state.marketName}
									onClick={() => this.handleCreateMarket(user)}
								>
									Submit
								</Button>
							</Dialog.Footer>
						</Dialog>
					</React.Fragment>
				)}
			</UserContext.Consumer>
		);
	}
}

export default NewMarket;
