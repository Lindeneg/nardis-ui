import { Route, Switch } from 'react-router-dom'; 

import Layout from './containers/Layout/Layout';
import Management from './containers/Management/Management';

const app = (): JSX.Element => (
	<div>
		<Layout>
			<Switch>
				<Route path="/management" component={Management} />	

			</Switch>
		</Layout>
	</div>
);

export default app;