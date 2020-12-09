import { IBaseProps } from '../../../../common/props';


export default interface INavigationItemProp extends IBaseProps {
    link: string,
    style?: {[key: string]: string},
    active?: boolean,
    exact?: boolean
}