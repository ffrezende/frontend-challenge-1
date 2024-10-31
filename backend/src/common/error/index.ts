import { ErrorType } from '../constants/index.js'

export interface IErrorHandler {
  status: string
  message: number
}
class ErrorHandler {
  static handleError(error: Error) {
    console.error(error.message)

    let status = 500
    let message = ErrorType.InternalServerError

    switch (error.message) {
      case ErrorType.ClientNotFound:
        status = 401
        message = error.message
        break
    }

    return { status, message }
  }
}

export default ErrorHandler
