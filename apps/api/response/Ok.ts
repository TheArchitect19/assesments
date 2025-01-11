import { HttpStatus } from "@nestjs/common";
import { ISuccessMessage } from "types/success";
import { dateAndTime } from '../utils/dateTime';
import { Response } from 'express';
import { OK_ResponseMessage } from "./messages/responseMessages";

const OK = (
    res: Response,
    entity: ISuccessMessage,
    data: any,
    status: HttpStatus,
) => {
    res.status(status).json({
        status: 'OK',
        data,
        timestamp: dateAndTime(),
        message: OK_ResponseMessage[entity],
    });
};

export default OK;
