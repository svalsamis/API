/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const navigation: FuseNavigationItem[] = [
    {
        id   : 'quotation',
        title: 'Προσφορές',
        type : 'basic',
        icon : 'mat_solid:format_quote',
        link : '/quotation'
    },
    {
        id   : 'clients',
        title: 'Πελάτες',
        type : 'basic',
        icon : 'heroicons_outline:user-group',
        link : '/customers'
    },
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    },
];

export const defaultNavigation: FuseNavigationItem[] = navigation;

export const compactNavigation: FuseNavigationItem[] = defaultNavigation;
// export const compactNavigation: FuseNavigationItem[] = [
//     {
//         id   : 'example',
//         title: 'Example',
//         type : 'basic',
//         icon : 'heroicons_outline:chart-pie',
//         link : '/example'
//     },
//     {
//         id   : 'clients',
//         title: 'Πελάτες',
//         type : 'basic',
//         icon : 'heroicons_outline:user-group',
//         link : '/customers'
//     }
// ];
export const futuristicNavigation: FuseNavigationItem[] = defaultNavigation;
// export const futuristicNavigation: FuseNavigationItem[] = [
//     {
//         id   : 'example',
//         title: 'Example',
//         type : 'basic',
//         icon : 'heroicons_outline:chart-pie',
//         link : '/example'
//     },
//     {
//         id   : 'example',
//         title: 'Example',
//         type : 'basic',
//         icon : 'heroicons_outline:chart-pie',
//         link : '/example'
//     }
// ];
export const horizontalNavigation: FuseNavigationItem[] = defaultNavigation;
// export const horizontalNavigation: FuseNavigationItem[] = [
//     {
//         id   : 'example',
//         title: 'Example',
//         type : 'basic',
//         icon : 'heroicons_outline:chart-pie',
//         link : '/example'
//     },
//     {
//         id   : 'example',
//         title: 'Example',
//         type : 'basic',
//         icon : 'heroicons_outline:chart-pie',
//         link : '/example'
//     }
// ];
