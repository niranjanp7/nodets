import { authWelcomeForm, login, loginForm, registerForm, register } from './auth/auth';
import { backupFile, deleteFile, readCustomerFile, writeToFile } from './filereader/filereader';
import { addProduct, readProductBackupSync, readProductSync, updateProduct } from './filereader/product';
import { privateData } from './private/private';
import { uploadFile } from './upload/upload';

const AuthController = {
    login,
    register,
    registerForm,
    authWelcomeForm,
    loginForm
};

const FileReaderController = {
    readCustomerFile,
    writeToFile,
    backupFile,
    deleteFile
};

const PrivateController = {
    privateData
};

const UploadController = {
    uploadFile
};

const ProductController = {
    readProductSync,
    addProduct,
    updateProduct,
    readProductBackupSync
};

export { AuthController, FileReaderController, PrivateController, UploadController, ProductController };
