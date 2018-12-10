import Recipient from "./Recipient";
import Message from "./Message";

export default interface ChatHistory{
    recipient: Recipient;
    messsages: Message[];
}