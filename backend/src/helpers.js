import * as crypto from 'crypto';
export const passwordHash = data =>
    crypto
        .createHash('md5')
        .update(data)
        .digest('hex');

