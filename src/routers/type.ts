export interface MetaProps {
    keepAlive?: boolean;
    requiresAuth?: boolean;
    title: string;
    key?: string;
    path?: string;
}
export interface RouteObject {
    children?: RouteObject[];
    element?: React.ReactNode;
    title?: string;
    key?: string;
    isLink?: string;
    meta?: MetaProps;
}
