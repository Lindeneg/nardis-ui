import { Route, Switch } from 'react-router-dom'; 

import Layout from './containers/Layout/Layout';
import Management from './containers/Management/Management';
import Finance from './containers/Finance/Finance';

const app = (): JSX.Element => (
	<div>
		<Layout>
			<Switch>
				<Route path="/management" component={Management} />	
				<Route path="/finance" component={Finance} />	
			</Switch>
		</Layout>
	</div>
);

export default app;