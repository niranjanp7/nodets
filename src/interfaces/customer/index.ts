import { UserNamespace } from './User'

export namespace CustomerNamespace {
    export import User = UserNamespace.User;
}