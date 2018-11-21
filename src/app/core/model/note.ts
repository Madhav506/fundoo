import { Label } from "./label";
import { checkLists } from "./checkList";

export interface Note {
    title:string,
    description:string,
    id:string,
    createdDate:Date,
    modifiedDate:Date,
    color:string,
    imageUrl:string,
    isArchived:boolean,
    isPined:boolean,
    isDeleted:boolean,
    userId:string,
    noteLabels:Array<Label>,
    noteCheckLists:Array<checkLists>,
    reminder:[Date],
    labelIdList:[string],
    collaberator:[Object],
    collaborators:[Object],
    questionAndAnswerNotes:[Object],
}

