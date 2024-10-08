import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ApolloWrapper } from '@/components/GraphqlContext';

const inter = Inter({ subsets: ['latin'] });

import GraphQLProvider from '@/lib/provider';

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ApolloWrapper>
				{/* <GraphQLProvider> */}
          {children}
				{/* </GraphQLProvider> */}
				</ApolloWrapper>
			</body>
		</html>
	);
}