export declare enum Errors {
    InvalidInput = 0,
    UnableToWriteHotFile = 1,
    InvalidConfiguration = 2,
    InvalidBuildSubDirectory = 3,
    InvalidPublicSubDirectory = 4,
    TooLongBuildDirectoryInput = 5,
    CompatibleFrameworkNotFound = 6,
    TooLongPublicDirectoryInput = 7,
    TooLongSsrOutputDirectoryInput = 8
}
export declare const errorMessages: (key: Errors) => string;
