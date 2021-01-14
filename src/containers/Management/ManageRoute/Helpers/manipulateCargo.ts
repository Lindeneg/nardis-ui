import { Resource, RouteCargo, RoutePlanCargo } from "nardis-game";
import { RouteRevolution } from "../../../../common/constants";


export const addCargo = (
    resource: Resource, 
    revolution: RouteRevolution, 
    routePlan: RoutePlanCargo | null
): RoutePlanCargo => {

    const cityOne: RouteCargo[] = routePlan ? [
        ...routePlan.cityOne.map((e: RouteCargo): RouteCargo => ({...e}))
    ] : [];
    const cityTwo: RouteCargo[] = routePlan ? [
        ...routePlan.cityTwo.map((e: RouteCargo): RouteCargo => ({...e}))
    ] : [];
    const targetCargo: RouteCargo[] = revolution === RouteRevolution.NonFull ? cityOne : cityTwo;
    const targetResource: RouteCargo[] = targetCargo.filter(target => target.resource.equals(resource));


    if (targetResource.length > 0) {
        targetResource[0].targetAmount++;
    } else {
        targetCargo.push({
            resource,
            actualAmount: 0,
            targetAmount: 1
        });
    }

    return {
        cityOne,
        cityTwo
    };
}

export const removeCargo = (
    resource: Resource, 
    revolution: RouteRevolution, 
    routePlan: RoutePlanCargo | null
): RoutePlanCargo => {

    const cityOne: RouteCargo[] = routePlan ? [
        ...routePlan.cityOne.map((e: RouteCargo): RouteCargo => ({...e}))
    ] : [];
    const cityTwo: RouteCargo[] = routePlan ? [
        ...routePlan.cityTwo.map((e: RouteCargo): RouteCargo => ({...e}))
    ] : [];
    const targetCargo: RouteCargo[] = revolution === RouteRevolution.NonFull ? cityOne : cityTwo;

    for (let i = 0; i < targetCargo.length; i++) {
        if (targetCargo[i].resource.equals(resource)) {
            if (targetCargo[i].targetAmount - 1 <= 0) {
                targetCargo.splice(i, 1);
            } else {
                targetCargo[i].targetAmount--;
            }
        }
    }

    return {
        cityOne,
        cityTwo
    };
}