import ListItem from './ListItem/ListItem';
import styles from './ListItems.module.css';
import IListItemsProps, { IMetaListContents, IMetaListContent } from "./ListItems.props";


const listItems = (props: IListItemsProps): JSX.Element => {

    const keys: string[] = Object.keys(props.content);
    let jsx: JSX.Element[] | null = null;

    for (let i: number = 0; i < keys.length; i++) {
        const key: string = keys[i];
        const metaContent: IMetaListContents = props.content[key];
        if (metaContent && metaContent.length > 0) {
            jsx = metaContent.map(((item: IMetaListContent, index: number) => (
                <ListItem 
                    whenClicked={props.whenClicked}
                    key={index}
                    listType={props.listType}
                    {...{[key.substr(0, key.length - 1)]: item}}
                />
            )));
            break;
        }
    }

    return (
        <div className={styles.ListItems}>
            {jsx}
        </div>
    );
}

export default listItems;