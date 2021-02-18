import { Route, Switch } from 'react-router-dom'; 

import Layout from './containers/Layout/Layout';
import Management from './containers/Management/Management';
import Finance from './containers/Finance/Finance';
import Upgrades from './containers/Upgrades/Upgrades';
import Resources from './containers/Resources/Resources';
import Opponents from './containers/Opponents/Opponents';

const app = (): JSX.Element => (
	<div>
		<Layout>
			<Switch>
				<Route path="/management" component={Management} />	
				<Route path="/finance" component={Finance} />
				<Route path="/upgrades" component={Upgrades} />		
				<Route path="/resources" component={Resources} />	
				<Route path="/opponents" component={Opponents} />	
			</Switch>
		</Layout>
	</div>
);

export default app;