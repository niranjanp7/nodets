import { authRequest, jwtAuthToken } from './auth/auth';
import { logRequestInfo } from './logger/logger';
import { upload } from './upload/uploads';

const AuthMiddleware = {
    authRequest,
    jwtAuthToken
};

const LogsMiddleware = {
    logRequestInfo
};

const UploadMiddleware = {
    upload
};

export { AuthMiddleware, LogsMiddleware, UploadMiddleware };
