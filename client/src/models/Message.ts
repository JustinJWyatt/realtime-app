import Recipient from "./Recipient";

export default interface Message{

    from: Recipient;
    to: Recipient;
    message: string;
    created: Date;     
}