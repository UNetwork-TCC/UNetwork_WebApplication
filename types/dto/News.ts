export interface NewsDTO {
    name: string;
    description: string;
    content: {
        text?: string;
        picture?: string;
    };
}