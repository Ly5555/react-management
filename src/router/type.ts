export interface MetaProps {
    keepAlive?: boolean;
    requiresAuth?: boolean;
    title: string;
    key?: string;
}
export interface RouteObject {
    children?: RouteObject[];
    element?: React.ReactNode;
    title?: string;
    path?: string;
    isLink?: string;
    meta?: MetaProps;
}
// export interface RouteObject {
// 	caseSensitive?: boolean;
// 	children?: RouteObject[];
// 	element?: React.ReactNode;
// 	index?: boolean;
// 	path?: string;
// 	meta?: MetaProps;
// 	isLink?: string;
// }