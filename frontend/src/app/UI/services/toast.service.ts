import { Injectable } from '@angular/core'

export interface Toast {
  message: string
  duration: number
  type: 'success' | 'info' | 'warning' | 'error'
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public _toasts: Toast[] = []

  /**
   * Handles setting and clearing the timeout for a toast. Only used internally.
   * @param toast The toast to handle the timeout for.
   */
  private handleTimeout(toast: Toast) {
    setTimeout(() => {
      this._toasts.splice(this._toasts.indexOf(toast), 1)
    }, toast.duration)
  }

  /**
   * Creates a new toast with the type 'success'.
   * @param message The message to display.
   * @param duration The duration to display the toast for. Defaults to 5 seconds.
   */
  public success(message: string, duration: number = 5000) {
    const l = this._toasts.push({ message, duration, type: 'success' })
    this.handleTimeout(this._toasts[l - 1])
  }

  /**
   * Creates a new toast with the type 'info'.
   * @param message The message to display.
   * @param duration The duration to display the toast for. Defaults to 5 seconds.
   */
  public info(message: string, duration: number = 5000) {
    const l = this._toasts.push({ message, duration, type: 'info' })
    this.handleTimeout(this._toasts[l - 1])
  }

  /**
   * Creates a new toast with the type 'warning'.
   * @param message The message to display.
   * @param duration The duration to display the toast for. Defaults to 5 seconds.
   */
  public warning(message: string, duration: number = 5000) {
    const l = this._toasts.push({ message, duration, type: 'warning' })
    this.handleTimeout(this._toasts[l - 1])
  }

  /**
   * Creates a new toast with the type 'error'.
   * @param message The message to display.
   * @param duration The duration to display the toast for. Defaults to 5 seconds.
   */
  public error(message: string, duration: number = 5000) {
    const l = this._toasts.push({ message, duration, type: 'error' })
    this.handleTimeout(this._toasts[l - 1])
  }
}