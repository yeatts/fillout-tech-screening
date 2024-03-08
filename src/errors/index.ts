export class NotFoundError extends Error {
  status: number

  constructor(message: string) {
    super(message || 'Not Found')
    this.name = 'NotFoundError'
    this.status = 404
  }

  getName(): string {
    return this.name
  }

  getStatus(): number {
    return this.status
  }

  setName(name: string): void {
    this.name = name
  }

  setStatus(status: number): void {
    this.status = status
  }
}

