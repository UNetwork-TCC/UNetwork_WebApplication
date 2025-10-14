export interface PostDTO {
    postedIn: string;
    postedBy: string;
    content: {
        text?: string
        picture?: string
    }
}