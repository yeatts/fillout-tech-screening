"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(message) {
        super(message || 'Not Found');
        this.name = 'NotFoundError';
        this.status = 404;
    }
    getName() {
        return this.name;
    }
    getStatus() {
        return this.status;
    }
    setName(name) {
        this.name = name;
    }
    setStatus(status) {
        this.status = status;
    }
}
exports.NotFoundError = NotFoundError;
