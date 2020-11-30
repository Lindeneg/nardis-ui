import { BaseProps } from '../../../../common/props';


export default interface NavigationItemProp extends BaseProps {
    link: string,
    active?: boolean,
    exact?: boolean
}