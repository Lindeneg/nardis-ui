import styles from './Table.module.css';

interface Props {
    headers: string[],
    rows: string[][]
}

const table = (props: Props) => (
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
                <tr key={i * 10}>
                    {row.map((entry: string): JSX.Element => (
                        <td key={entry} className={styles.RowEntry}>
                            {entry}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
)

export default table;