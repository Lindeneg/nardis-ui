import INavigationItemProp from './NavigationEntry/NavigationEntry.props'; 

interface IEntry extends INavigationItemProp {
    content: string
}

export default interface INavigationEntriesProps {
    entries: IEntry[],
    showEndTurnButton: boolean
}