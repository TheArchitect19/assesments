import { HttpStatus } from "@nestjs/common";
import { IErrorMessage } from "types/error";
import { dateAndTime } from "utils/dateTime";
import { NotOK_ResponseMessage } from "./messages/responseMessages";
import { Response } from 'express';

const NotOK = (
    res: Response,
    entity: IErrorMessage,
    data: any,
    status: HttpStatus,
) => {
    res.status(status).json({
        status: 'Not OK',
        data,
        timestamp: dateAndTime(),
        message: NotOK_ResponseMessage[entity],
    });
};

export default NotOK;
