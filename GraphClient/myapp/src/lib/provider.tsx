'use client';

import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
} from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://localhost:8000/graphql', // ? Change to your server URL here
	cache: new InMemoryCache(),
});

interface IGraphQlProviderProps {
	children: React.ReactNode;
}

const GraphQLProvider: React.FC<IGraphQlProviderProps> = ({
	children,
}) => {
	return (
		<ApolloProvider client={client}>{children}</ApolloProvider>
	);
};

export default GraphQLProvider;