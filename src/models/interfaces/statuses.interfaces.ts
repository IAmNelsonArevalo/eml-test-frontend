export interface IStatus {
    id: number;
    name: string;
    model: string;
    color_status: string;
    translate_status: string;
    created_at: string;
    updated_at: string;
}

export interface IDocumentTypes {
    name: string;
    id: number;
}

export interface IHomeProps {
    users: any;
    document_types: Array<IDocumentTypes>;
}