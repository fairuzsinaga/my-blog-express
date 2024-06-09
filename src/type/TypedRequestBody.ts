interface TypedRequestBody<T> extends Express.Request {
  body: T
}

export default TypedRequestBody