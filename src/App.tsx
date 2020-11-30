import Layout from './containers/Layout/Layout';

import { generateData } from 'nardis-game';


console.log(generateData());

const app = (): JSX.Element => (
	<div>
		<Layout>
			
		</Layout>
	</div>
);

export default app;