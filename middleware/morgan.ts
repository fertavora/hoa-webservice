import morgan from 'morgan';
import uuid from 'uuid4';
import express from 'express';

morgan.token('trace-id', (request:any) => {
  return request['trace-id'];
});

type RequestWithTraceId <T> = Partial<T>
  & { 'trace-id': string }

export const addTraceIdHeader:any = (request:RequestWithTraceId<express.Request>, response:express.Response, next:express.NextFunction) => {
  const traceId:string = uuid();
  request['trace-id'] = traceId;
  response.header('trace-id', traceId);
  next();
}

export const morganFormat:string = ':method :url - :status :response-time ms - :trace-id';

export default morgan;
