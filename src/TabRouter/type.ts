export interface MenuItem {
    path: string;
    title: React.ReactNode;
    exact: boolean;
    component: React.ComponentType;
    hidden?: boolean;
    hasPermission?: (() => boolean) | boolean | null;
    icon?: React.ReactNode;
}

export declare type ModeTypes = 'horizontal' | 'vertical' | 'inline';
