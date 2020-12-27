import { Functional, Props } from '../../../common/props';
import styles from './Table.module.css';


interface TableProps extends Props {
    headers: string[],
    rows: string[][]
};


/**
 * Simple Table component that offers the same styling for mobile/desktop. Should be wrapped in another component.
 */
const table: Functional<TableProps> = (
    props: TableProps
): JSX.Element => (
    <table className={styles.Table}>
        <tbody>
            <tr>
                {props.headers.map((content: string, i: number): JSX.Element => (
                    <th key={i} className={styles.Header}>
                        {content}
                    </th>
                ))}
            </tr>
            {props.rows.map((row: string[], i: number): JSX.Element => (
                <tr key={row[0] + i}>
                    {row.map((entry: string): JSX.Element => (
                        <td key={entry} className={styles.RowEntry}>
                            {entry}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);


export default table;