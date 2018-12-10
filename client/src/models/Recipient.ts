import ChatHistory from './ChatHistory';

export default interface Recipient {

    id: number,
    name: string;
    image: string;
    online: boolean;
    history: ChatHistory[];
 }