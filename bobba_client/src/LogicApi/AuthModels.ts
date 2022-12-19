export class Client {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    token(body: TokenRequestModel | undefined): Promise<TokenModel> {
        let url_ = this.baseUrl + "/api/Auth/Token";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processToken(_response);
        });
    }

    protected processToken(response: Response): Promise<TokenModel> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = TokenModel.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<TokenModel>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    refreshToken(body: RefreshTokenRequestModel | undefined): Promise<TokenModel> {
        let url_ = this.baseUrl + "/api/Auth/RefreshToken";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processRefreshToken(_response);
        });
    }

    protected processRefreshToken(response: Response): Promise<TokenModel> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = TokenModel.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<TokenModel>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    registerUser(body: CreateUserModel | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Auth/RegisterUser";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processRegisterUser(_response);
        });
    }

    protected processRegisterUser(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }
}

export class CreateUserModel implements ICreateUserModel {
    name!: string;
    email!: string;
    password!: string;
    retryPassword!: string;
    birthDate!: Date;
    about?: string | undefined;

    constructor(data?: ICreateUserModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.email = _data["email"];
            this.password = _data["password"];
            this.retryPassword = _data["retryPassword"];
            this.birthDate = _data["birthDate"] ? new Date(_data["birthDate"].toString()) : <any>undefined;
            this.about = _data["about"];
        }
    }

    static fromJS(data: any): CreateUserModel {
        data = typeof data === 'object' ? data : {};
        let result = new CreateUserModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["email"] = this.email;
        data["password"] = this.password;
        data["retryPassword"] = this.retryPassword;
        data["birthDate"] = this.birthDate ? this.birthDate.toISOString() : <any>undefined;
        data["about"] = this.about;
        return data;
    }
}

export interface ICreateUserModel {
    name: string;
    email: string;
    password: string;
    retryPassword: string;
    birthDate: Date;
    about?: string | undefined;
}

export class RefreshTokenRequestModel implements IRefreshTokenRequestModel {
    refreshToken?: string | undefined;

    constructor(data?: IRefreshTokenRequestModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.refreshToken = _data["refreshToken"];
        }
    }

    static fromJS(data: any): RefreshTokenRequestModel {
        data = typeof data === 'object' ? data : {};
        let result = new RefreshTokenRequestModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["refreshToken"] = this.refreshToken;
        return data;
    }
}

export interface IRefreshTokenRequestModel {
    refreshToken?: string | undefined;
}

export class TokenModel implements ITokenModel {
    accessToken?: string | undefined;
    refreshToken?: string | undefined;

    constructor(data?: ITokenModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.accessToken = _data["accessToken"];
            this.refreshToken = _data["refreshToken"];
        }
    }

    static fromJS(data: any): TokenModel {
        data = typeof data === 'object' ? data : {};
        let result = new TokenModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["accessToken"] = this.accessToken;
        data["refreshToken"] = this.refreshToken;
        return data;
    }
}

export interface ITokenModel {
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
}

export class TokenRequestModel implements ITokenRequestModel {
    login?: string | undefined;
    pass?: string | undefined;

    constructor(data?: ITokenRequestModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.login = _data["login"];
            this.pass = _data["pass"];
        }
    }

    static fromJS(data: any): TokenRequestModel {
        data = typeof data === 'object' ? data : {};
        let result = new TokenRequestModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["login"] = this.login;
        data["pass"] = this.pass;
        return data;
    }
}

export interface ITokenRequestModel {
    login?: string | undefined;
    pass?: string | undefined;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}