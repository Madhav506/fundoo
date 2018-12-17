import {Deserializable} from "./deserializable";

export class Label implements Deserializable {
    id:string;
    label:string;
    isDeleted:boolean;
    userId:string

    
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
    }