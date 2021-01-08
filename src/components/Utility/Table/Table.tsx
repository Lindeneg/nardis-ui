import { CSSProperties } from 'react';

import { generateArrayOfRandomNames } from 'nardis-game';

import Styles from './Table.module.css';
import { Functional, Props } from '../../../common/props';


interface TableProps extends Props {
    headers           : string[],
    rows              : string[][]
    headerStyles     ?: CSSProperties,
    headerStylesAfter?: CSSProperties,
    rowStyles        ?: CSSProperties,
};


/**
 * Simple Table component that offers the same styling for mobile/desktop. Should be wrapped in another component.
 */
const table: Functional<TableProps> = (
    props: TableProps
): JSX.Element => (
    <table className={Styles.Table}>
        <tbody>
            <tr>
                {props.headers.map((content: string, i: number): JSX.Element => (
                    <th 
                        key={i} 
                        className={Styles.Header}
                        style={i > 0 ? props.headerStylesAfter || props.headerStyles : props.headerStyles}
                    >
                        {content}
                    </th>
                ))}
            </tr>
            {props.rows.map((row: string[], i: number): JSX.Element => (
                <tr key={i}>
                    {row.map((entry: string): JSX.Element => (
                        <td 
                            key={generateArrayOfRandomNames(1, 32, 32, [])[0]} 
                            className={Styles.RowEntry}
                            style={props.rowStyles}
                        >
                            {entry}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);


export default table;