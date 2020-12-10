import { CityResource } from "nardis-game";
import Table from '../../../Utility/Table/Table';
import { cityResourceTableHeaderNames } from "../../../../common/constants";

interface Props {
    resources: CityResource[]
}

const cityResources = (props: Props): JSX.Element => {
    const rows: string[][] = props.resources.map((r: CityResource) => (
        [
            r.resource.name, 
            r.resource.getValue() + 'g',
            r.resource.getWeight().toString() + 't',
            r.available > -1 ? r.available.toString() : '~'
        ]
    ))
    .sort((a: string[], b: string[]): number => (
        parseInt(a[1].replace('g', '')) - parseInt(b[1].replace('g', ''))
    ));
    return <Table headers={cityResourceTableHeaderNames} rows={rows} />
}

export default cityResources