export class SafeEnvError extends Error {
  constructor(message?: string) {
    super(message)

    // We set the name and prototype for backwards compatibility reasons
    this.name = 'SafeEnvError'
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
