import { CityResource, RouteCargo } from "nardis-game";

import Table from '../../../Utility/Table/Table';
import { cityResourceTableHeaderNames } from "../../../../common/constants";
import { Functional, Props } from "../../../../common/props";


interface CityResourcesProps extends Props {
    resources : CityResource[],
    routeCargo: RouteCargo[]
};


/**
 * Component to display city resources in a table, with resources sorted by weight.
 */
const cityResources: Functional<CityResourcesProps> = (
    props: CityResourcesProps
): JSX.Element => (
    <Table 
        headers={cityResourceTableHeaderNames} 
        rows={props.resources.map((row: CityResource): string[] => {
            const match: number = props.routeCargo
            .filter((entry: RouteCargo): boolean => entry.resource.equals(row.resource))
            .map((entry: RouteCargo): number => entry.targetAmount)
            .reduce((a: number, b: number): number => a + b, 0);
            return (
            [
                row.resource.name, 
                row.resource.getValue() + 'g',
                row.resource.getWeight().toString() + 't',
                row.available > -1 ? (row.available - match).toString() : '~'
            ]
        )})
        .sort((a: string[], b: string[]): number => (
            parseInt(a[1].replace('g', '')) - parseInt(b[1].replace('g', ''))
        ))} 
    />
);


export default cityResources;