import { NardisState } from '../../common/state';
import { ActionFunc, ActionFuncArgs } from '../../common/actions';
import update from './update';


const editActivePlayerRoute: ActionFunc = (
    args: ActionFuncArgs
): NardisState => {
    let state: NardisState = {...args.state};
    if (args.state.gameCreated && args.state._game && args.payload.editActivePlayerRoute) {
        args.state._game.changeActivePlayerRoute(
            args.payload.editActivePlayerRoute.routeId,
            args.payload.editActivePlayerRoute.train,
            args.payload.editActivePlayerRoute.routePlan,
            args.payload.editActivePlayerRoute.cost
        );
        state = {...update({state, payload: {}})};
    }
    return state;
};


export default editActivePlayerRoute;