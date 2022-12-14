import { Cookies } from "react-cookie";
export class Client {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @param download (optional) 
     * @return Success
     */
    getPostContent(postContentId: string, download: boolean | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Attach/GetPostContent/{postContentId}?";
        if (postContentId === undefined || postContentId === null)
            throw new Error("The parameter 'postContentId' must be defined.");
        url_ = url_.replace("{postContentId}", encodeURIComponent("" + postContentId));
        if (download === null)
            throw new Error("The parameter 'download' cannot be null.");
        else if (download !== undefined)
            url_ += "download=" + encodeURIComponent("" + download) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetPostContent(_response);
        });
    }

    protected processGetPostContent(response: Response): Promise<void> {
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

    /**
     * @param download (optional) 
     * @return Success
     */
    getUserAvatar(userId: string, download: boolean | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Attach/GetUserAvatar/{userId}?";
        if (userId === undefined || userId === null)
            throw new Error("The parameter 'userId' must be defined.");
        url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
        if (download === null)
            throw new Error("The parameter 'download' cannot be null.");
        else if (download !== undefined)
            url_ += "download=" + encodeURIComponent("" + download) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetUserAvatar(_response);
        });
    }

    protected processGetUserAvatar(response: Response): Promise<void> {
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

    /**
     * @param download (optional) 
     * @return Success
     */
    getCurentUserAvatar(download: boolean | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Attach/GetCurentUserAvatar?";
        if (download === null)
            throw new Error("The parameter 'download' cannot be null.");
        else if (download !== undefined)
            url_ += "download=" + encodeURIComponent("" + download) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetCurentUserAvatar(_response);
        });
    }

    protected processGetCurentUserAvatar(response: Response): Promise<void> {
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

    /**
     * @param files (optional) 
     * @return Success
     */
    uploadFiles(files: FileParameter[] | undefined): Promise<MetadataModel[]> {
        let url_ = this.baseUrl + "/api/Attach/UploadFiles";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = new FormData();
        if (files === null || files === undefined)
            throw new Error("The parameter 'files' cannot be null.");
        else
            files.forEach(item_ => content_.append("files", item_.data, item_.fileName ? item_.fileName : "files") );
        var cookies = new Cookies();
        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Accept": "text/plain",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUploadFiles(_response);
        });
    }

    protected processUploadFiles(response: Response): Promise<MetadataModel[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(MetadataModel.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<MetadataModel[]>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    createComment(body: CommentModel | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Comment/CreateComment";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        var cookies = new Cookies();
        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCreateComment(_response);
        });
    }

    protected processCreateComment(response: Response): Promise<void> {
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

    /**
     * @param postId (optional) 
     * @return Success
     */
    getComments(postId: string | undefined): Promise<GetCommentsRequestModel[]> {
        let url_ = this.baseUrl + "/api/Comment/GetComments?";
        if (postId === null)
            throw new Error("The parameter 'postId' cannot be null.");
        else if (postId !== undefined)
            url_ += "postId=" + encodeURIComponent("" + postId) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetComments(_response);
        });
    }

    protected processGetComments(response: Response): Promise<GetCommentsRequestModel[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(GetCommentsRequestModel.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetCommentsRequestModel[]>(null as any);
    }

    /**
     * @param comId (optional) 
     * @return Success
     */
    deleteComments(comId: string | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Comment/DeleteComments?";
        if (comId === null)
            throw new Error("The parameter 'comId' cannot be null.");
        else if (comId !== undefined)
            url_ += "comId=" + encodeURIComponent("" + comId) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeleteComments(_response);
        });
    }

    protected processDeleteComments(response: Response): Promise<void> {
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

    /**
     * @param body (optional) 
     * @return Success
     */
    likeThePost(body: LikeRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Like/LikeThePost";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        var cookies = new Cookies();
        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processLikeThePost(_response);
        });
    }

    protected processLikeThePost(response: Response): Promise<void> {
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

    /**
     * @param body (optional) 
     * @return Success
     */
    likeTheComment(body: LikeRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Like/LikeTheComment";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        var cookies = new Cookies();
        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processLikeTheComment(_response);
        });
    }

    protected processLikeTheComment(response: Response): Promise<void> {
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

    /**
     * @param body (optional) 
     * @return Success
     */
    deleteLikeFromPost(body: LikeRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Like/DeleteLikeFromPost";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        var cookies = new Cookies();
        let options_: RequestInit = {
            body: content_,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeleteLikeFromPost(_response);
        });
    }

    protected processDeleteLikeFromPost(response: Response): Promise<void> {
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

    /**
     * @param body (optional) 
     * @return Success
     */
    deleteLikeFromComment(body: LikeRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Like/DeleteLikeFromComment";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        var cookies = new Cookies();
        let options_: RequestInit = {
            body: content_,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeleteLikeFromComment(_response);
        });
    }

    protected processDeleteLikeFromComment(response: Response): Promise<void> {
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

    /**
     * @param postId (optional) 
     * @return Success
     */
    getPostLikes(postId: string | undefined): Promise<PostLike[]> {
        let url_ = this.baseUrl + "/api/Like/GetPostLikes?";
        if (postId === null)
            throw new Error("The parameter 'postId' cannot be null.");
        else if (postId !== undefined)
            url_ += "postId=" + encodeURIComponent("" + postId) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetPostLikes(_response);
        });
    }

    protected processGetPostLikes(response: Response): Promise<PostLike[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(PostLike.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PostLike[]>(null as any);
    }

    /**
     * @param commentId (optional) 
     * @return Success
     */
    getCommentLikes(commentId: string | undefined): Promise<CommentLike[]> {
        let url_ = this.baseUrl + "/api/Like/GetCommentLikes?";
        if (commentId === null)
            throw new Error("The parameter 'commentId' cannot be null.");
        else if (commentId !== undefined)
            url_ += "commentId=" + encodeURIComponent("" + commentId) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetCommentLikes(_response);
        });
    }

    protected processGetCommentLikes(response: Response): Promise<CommentLike[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(CommentLike.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<CommentLike[]>(null as any);
    }

    /**
     * @param skip (optional) 
     * @param take (optional) 
     * @return Success
     */
    getAllPosts(skip: number | undefined, take: number | undefined): Promise<PostModel[]> {
        let url_ = this.baseUrl + "/api/Post/GetAllPosts?";
        if (skip === null)
            throw new Error("The parameter 'skip' cannot be null.");
        else if (skip !== undefined)
            url_ += "skip=" + encodeURIComponent("" + skip) + "&";
        if (take === null)
            throw new Error("The parameter 'take' cannot be null.");
        else if (take !== undefined)
            url_ += "take=" + encodeURIComponent("" + take) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetAllPosts(_response);
        });
    }

    protected processGetAllPosts(response: Response): Promise<PostModel[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(PostModel.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PostModel[]>(null as any);
    }

    /**
     * @param skip (optional) 
     * @param take (optional) 
     * @return Success
     */
    getSubscriptionPosts(skip: number | undefined, take: number | undefined): Promise<PostModel[]> {
        let url_ = this.baseUrl + "/api/Post/GetSubscriptionPosts?";
        if (skip === null)
            throw new Error("The parameter 'skip' cannot be null.");
        else if (skip !== undefined)
            url_ += "skip=" + encodeURIComponent("" + skip) + "&";
        if (take === null)
            throw new Error("The parameter 'take' cannot be null.");
        else if (take !== undefined)
            url_ += "take=" + encodeURIComponent("" + take) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetSubscriptionPosts(_response);
        });
    }

    protected processGetSubscriptionPosts(response: Response): Promise<PostModel[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(PostModel.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PostModel[]>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    changePosts(body: ChangePost | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Post/ChangePosts";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        var cookies = new Cookies();
        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processChangePosts(_response);
        });
    }

    protected processChangePosts(response: Response): Promise<void> {
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

    /**
     * @param id (optional) 
     * @return Success
     */
    getPostByUserId(id: string | undefined): Promise<PostModel[]> {
        let url_ = this.baseUrl + "/api/Post/GetPostByUserId?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetPostByUserId(_response);
        });
    }

    protected processGetPostByUserId(response: Response): Promise<PostModel[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(PostModel.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PostModel[]>(null as any);
    }

    /**
     * @param userName (optional) 
     * @return Success
     */
    getPostByUserName(userName: string | undefined): Promise<PostModel[]> {
        let url_ = this.baseUrl + "/api/Post/GetPostByUserName?";
        if (userName === null)
            throw new Error("The parameter 'userName' cannot be null.");
        else if (userName !== undefined)
            url_ += "UserName=" + encodeURIComponent("" + userName) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetPostByUserName(_response);
        });
    }

    protected processGetPostByUserName(response: Response): Promise<PostModel[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(PostModel.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PostModel[]>(null as any);
    }

    /**
     * @param id (optional) 
     * @return Success
     */
    getPostById(id: string | undefined): Promise<PostModel> {
        let url_ = this.baseUrl + "/api/Post/GetPostById?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetPostById(_response);
        });
    }

    protected processGetPostById(response: Response): Promise<PostModel> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = PostModel.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PostModel>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    createPost(body: CreatePostRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Post/CreatePost";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        var cookies = new Cookies();
        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCreatePost(_response);
        });
    }

    protected processCreatePost(response: Response): Promise<void> {
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

    /**
     * @param postId (optional) 
     * @return Success
     */
    deletePost(postId: string | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Post/DeletePost?";
        if (postId === null)
            throw new Error("The parameter 'postId' cannot be null.");
        else if (postId !== undefined)
            url_ += "PostId=" + encodeURIComponent("" + postId) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeletePost(_response);
        });
    }

    protected processDeletePost(response: Response): Promise<void> {
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

    /**
     * @param body (optional) 
     * @return Success
     */
    subscribe(body: SubscriptionRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Subscription/Subscribe";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        var cookies = new Cookies();
        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processSubscribe(_response);
        });
    }

    protected processSubscribe(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status === 400) {
            return response.text().then((_responseText) => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = ProblemDetails.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    unSubscribe(body: SubscriptionRequest | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Subscription/UnSubscribe";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        var cookies = new Cookies();
        let options_: RequestInit = {
            body: content_,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUnSubscribe(_response);
        });
    }

    protected processUnSubscribe(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status === 400) {
            return response.text().then((_responseText) => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = ProblemDetails.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param userId (optional) 
     * @return Success
     */
    getSubscription(userId: string | undefined): Promise<SubscriptionModel[]> {
        let url_ = this.baseUrl + "/api/Subscription/GetSubscription?";
        if (userId === null)
            throw new Error("The parameter 'userId' cannot be null.");
        else if (userId !== undefined)
            url_ += "userId=" + encodeURIComponent("" + userId) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetSubscription(_response);
        });
    }

    protected processGetSubscription(response: Response): Promise<SubscriptionModel[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(SubscriptionModel.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status === 400) {
            return response.text().then((_responseText) => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = ProblemDetails.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<SubscriptionModel[]>(null as any);
    }

    /**
     * @param userId (optional) 
     * @return Success
     */
    getSubscribers(userId: string | undefined): Promise<SubscriptionModel[]> {
        let url_ = this.baseUrl + "/api/Subscription/GetSubscribers?";
        if (userId === null)
            throw new Error("The parameter 'userId' cannot be null.");
        else if (userId !== undefined)
            url_ += "userId=" + encodeURIComponent("" + userId) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetSubscribers(_response);
        });
    }

    protected processGetSubscribers(response: Response): Promise<SubscriptionModel[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(SubscriptionModel.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status === 400) {
            return response.text().then((_responseText) => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result400 = ProblemDetails.fromJS(resultData400);
            return throwException("Bad Request", status, _responseText, _headers, result400);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<SubscriptionModel[]>(null as any);
    }

    /**
     * @param userId (optional) 
     * @return Success
     */
    getUserById(userId: string | undefined): Promise<UserAvatarModel> {
        let url_ = this.baseUrl + "/api/User/GetUserById?";
        if (userId === null)
            throw new Error("The parameter 'userId' cannot be null.");
        else if (userId !== undefined)
            url_ += "userId=" + encodeURIComponent("" + userId) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetUserById(_response);
        });
    }

    protected processGetUserById(response: Response): Promise<UserAvatarModel> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = UserAvatarModel.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<UserAvatarModel>(null as any);
    }

    /**
     * @param userName (optional) 
     * @return Success
     */
    getUserByName(userName: string | undefined): Promise<UserAvatarModel> {
        let url_ = this.baseUrl + "/api/User/GetUserByName?";
        if (userName === null)
            throw new Error("The parameter 'userName' cannot be null.");
        else if (userName !== undefined)
            url_ += "UserName=" + encodeURIComponent("" + userName) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetUserByName(_response);
        });
    }

    protected processGetUserByName(response: Response): Promise<UserAvatarModel> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = UserAvatarModel.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<UserAvatarModel>(null as any);
    }

    /**
     * @return Success
     */
    deleteMyAccount(): Promise<void> {
        let url_ = this.baseUrl + "/api/User/DeleteMyAccount";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeleteMyAccount(_response);
        });
    }

    protected processDeleteMyAccount(response: Response): Promise<void> {
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

    /**
     * @param body (optional) 
     * @return Success
     */
    changeMyAccount(body: ChangeUser | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/User/ChangeMyAccount";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        var cookies = new Cookies();
        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processChangeMyAccount(_response);
        });
    }

    protected processChangeMyAccount(response: Response): Promise<void> {
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

    /**
     * @return Success
     */
    logOut(): Promise<void> {
        let url_ = this.baseUrl + "/api/User/LogOut";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processLogOut(_response);
        });
    }

    protected processLogOut(response: Response): Promise<void> {
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

    /**
     * @param body (optional) 
     * @return Success
     */
    changeMyPassword(body: ChangeUserPassword | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/User/ChangeMyPassword";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        var cookies = new Cookies();
        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processChangeMyPassword(_response);
        });
    }

    protected processChangeMyPassword(response: Response): Promise<void> {
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

    /**
     * @return Success
     */
    getUsers(): Promise<UserAvatarModel[]> {
        let url_ = this.baseUrl + "/api/User/GetUsers";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetUsers(_response);
        });
    }

    protected processGetUsers(response: Response): Promise<UserAvatarModel[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(UserAvatarModel.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<UserAvatarModel[]>(null as any);
    }

    /**
     * @return Success
     */
    getCurrentUser(): Promise<UserAvatarModel> {
        let url_ = this.baseUrl + "/api/User/GetCurrentUser";
        url_ = url_.replace(/[?&]$/, "");
        var cookies = new Cookies();
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetCurrentUser(_response);
        });
    }

    protected processGetCurrentUser(response: Response): Promise<UserAvatarModel> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = UserAvatarModel.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<UserAvatarModel>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    addAvatarToUser(body: MetadataModel | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/User/AddAvatarToUser";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);
        var cookies = new Cookies();
        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": cookies.get("accessToken"),
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAddAvatarToUser(_response);
        });
    }

    protected processAddAvatarToUser(response: Response): Promise<void> {
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

export class AttachExternalModel implements IAttachExternalModel {
    id?: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    contentLink?: string | undefined;

    constructor(data?: IAttachExternalModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.mimeType = _data["mimeType"];
            this.contentLink = _data["contentLink"];
        }
    }

    static fromJS(data: any): AttachExternalModel {
        data = typeof data === 'object' ? data : {};
        let result = new AttachExternalModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["mimeType"] = this.mimeType;
        data["contentLink"] = this.contentLink;
        return data;
    }
}

export interface IAttachExternalModel {
    id?: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    contentLink?: string | undefined;
}

export class Avatar implements IAvatar {
    id?: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    filePath?: string | undefined;
    size?: number;
    authorId?: string;
    author?: User;
    ownerId?: string;
    owner?: User;

    constructor(data?: IAvatar) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.mimeType = _data["mimeType"];
            this.filePath = _data["filePath"];
            this.size = _data["size"];
            this.authorId = _data["authorId"];
            this.author = _data["author"] ? User.fromJS(_data["author"]) : <any>undefined;
            this.ownerId = _data["ownerId"];
            this.owner = _data["owner"] ? User.fromJS(_data["owner"]) : <any>undefined;
        }
    }

    static fromJS(data: any): Avatar {
        data = typeof data === 'object' ? data : {};
        let result = new Avatar();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["mimeType"] = this.mimeType;
        data["filePath"] = this.filePath;
        data["size"] = this.size;
        data["authorId"] = this.authorId;
        data["author"] = this.author ? this.author.toJSON() : <any>undefined;
        data["ownerId"] = this.ownerId;
        data["owner"] = this.owner ? this.owner.toJSON() : <any>undefined;
        return data;
    }
}

export interface IAvatar {
    id?: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    filePath?: string | undefined;
    size?: number;
    authorId?: string;
    author?: User;
    ownerId?: string;
    owner?: User;
}

export class ChangePost implements IChangePost {
    id?: string;
    description?: string | undefined;

    constructor(data?: IChangePost) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.description = _data["description"];
        }
    }

    static fromJS(data: any): ChangePost {
        data = typeof data === 'object' ? data : {};
        let result = new ChangePost();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["description"] = this.description;
        return data;
    }
}

export interface IChangePost {
    id?: string;
    description?: string | undefined;
}

export class ChangeUser implements IChangeUser {
    name?: string | undefined;
    email?: string | undefined;
    birthDate?: Date;
    about?: string | undefined;

    constructor(data?: IChangeUser) {
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
            this.birthDate = _data["birthDate"] ? new Date(_data["birthDate"].toString()) : <any>undefined;
            this.about = _data["about"];
        }
    }

    static fromJS(data: any): ChangeUser {
        data = typeof data === 'object' ? data : {};
        let result = new ChangeUser();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["email"] = this.email;
        data["birthDate"] = this.birthDate ? this.birthDate.toISOString() : <any>undefined;
        data["about"] = this.about;
        return data;
    }
}

export interface IChangeUser {
    name?: string | undefined;
    email?: string | undefined;
    birthDate?: Date;
    about?: string | undefined;
}

export class ChangeUserPassword implements IChangeUserPassword {
    oldPassword!: string;
    newPassword!: string;
    retryPassword!: string;

    constructor(data?: IChangeUserPassword) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.oldPassword = _data["oldPassword"];
            this.newPassword = _data["newPassword"];
            this.retryPassword = _data["retryPassword"];
        }
    }

    static fromJS(data: any): ChangeUserPassword {
        data = typeof data === 'object' ? data : {};
        let result = new ChangeUserPassword();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["oldPassword"] = this.oldPassword;
        data["newPassword"] = this.newPassword;
        data["retryPassword"] = this.retryPassword;
        return data;
    }
}

export interface IChangeUserPassword {
    oldPassword: string;
    newPassword: string;
    retryPassword: string;
}

export class Comment implements IComment {
    id?: string;
    postId?: string;
    authorId?: string;
    author?: User;
    created?: Date;
    commentText?: string | undefined;
    likes?: CommentLike[] | undefined;

    constructor(data?: IComment) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.postId = _data["postId"];
            this.authorId = _data["authorId"];
            this.author = _data["author"] ? User.fromJS(_data["author"]) : <any>undefined;
            this.created = _data["created"] ? new Date(_data["created"].toString()) : <any>undefined;
            this.commentText = _data["commentText"];
            if (Array.isArray(_data["likes"])) {
                this.likes = [] as any;
                for (let item of _data["likes"])
                    this.likes!.push(CommentLike.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Comment {
        data = typeof data === 'object' ? data : {};
        let result = new Comment();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["postId"] = this.postId;
        data["authorId"] = this.authorId;
        data["author"] = this.author ? this.author.toJSON() : <any>undefined;
        data["created"] = this.created ? this.created.toISOString() : <any>undefined;
        data["commentText"] = this.commentText;
        if (Array.isArray(this.likes)) {
            data["likes"] = [];
            for (let item of this.likes)
                data["likes"].push(item.toJSON());
        }
        return data;
    }
}

export interface IComment {
    id?: string;
    postId?: string;
    authorId?: string;
    author?: User;
    created?: Date;
    commentText?: string | undefined;
    likes?: CommentLike[] | undefined;
}

export class CommentLike implements ICommentLike {
    id?: string;
    userId?: string;
    user?: User;
    commentId?: string;
    comment?: Comment;

    constructor(data?: ICommentLike) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.userId = _data["userId"];
            this.user = _data["user"] ? User.fromJS(_data["user"]) : <any>undefined;
            this.commentId = _data["commentId"];
            this.comment = _data["comment"] ? Comment.fromJS(_data["comment"]) : <any>undefined;
        }
    }

    static fromJS(data: any): CommentLike {
        data = typeof data === 'object' ? data : {};
        let result = new CommentLike();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["userId"] = this.userId;
        data["user"] = this.user ? this.user.toJSON() : <any>undefined;
        data["commentId"] = this.commentId;
        data["comment"] = this.comment ? this.comment.toJSON() : <any>undefined;
        return data;
    }
}

export interface ICommentLike {
    id?: string;
    userId?: string;
    user?: User;
    commentId?: string;
    comment?: Comment;
}

export class CommentModel implements ICommentModel {
    postId?: string;
    commentText?: string | undefined;

    constructor(data?: ICommentModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.postId = _data["postId"];
            this.commentText = _data["commentText"];
        }
    }

    static fromJS(data: any): CommentModel {
        data = typeof data === 'object' ? data : {};
        let result = new CommentModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["postId"] = this.postId;
        data["commentText"] = this.commentText;
        return data;
    }
}

export interface ICommentModel {
    postId?: string;
    commentText?: string | undefined;
}

export class CreatePostRequest implements ICreatePostRequest {
    description?: string | undefined;
    contents?: MetadataModel[] | undefined;

    constructor(data?: ICreatePostRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.description = _data["description"];
            if (Array.isArray(_data["contents"])) {
                this.contents = [] as any;
                for (let item of _data["contents"])
                    this.contents!.push(MetadataModel.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CreatePostRequest {
        data = typeof data === 'object' ? data : {};
        let result = new CreatePostRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["description"] = this.description;
        if (Array.isArray(this.contents)) {
            data["contents"] = [];
            for (let item of this.contents)
                data["contents"].push(item.toJSON());
        }
        return data;
    }
}

export interface ICreatePostRequest {
    description?: string | undefined;
    contents?: MetadataModel[] | undefined;
}

export class GetCommentsRequestModel implements IGetCommentsRequestModel {
    id?: string;
    authorId?: string;
    commentText?: string | undefined;
    created?: Date;

    constructor(data?: IGetCommentsRequestModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.authorId = _data["authorId"];
            this.commentText = _data["commentText"];
            this.created = _data["created"] ? new Date(_data["created"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): GetCommentsRequestModel {
        data = typeof data === 'object' ? data : {};
        let result = new GetCommentsRequestModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["authorId"] = this.authorId;
        data["commentText"] = this.commentText;
        data["created"] = this.created ? this.created.toISOString() : <any>undefined;
        return data;
    }
}

export interface IGetCommentsRequestModel {
    id?: string;
    authorId?: string;
    commentText?: string | undefined;
    created?: Date;
}

export class LikeRequest implements ILikeRequest {
    entityId?: string;

    constructor(data?: ILikeRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.entityId = _data["entityId"];
        }
    }

    static fromJS(data: any): LikeRequest {
        data = typeof data === 'object' ? data : {};
        let result = new LikeRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["entityId"] = this.entityId;
        return data;
    }
}

export interface ILikeRequest {
    entityId?: string;
}

export class MetadataModel implements IMetadataModel {
    tempId?: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    size?: number;

    constructor(data?: IMetadataModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.tempId = _data["tempId"];
            this.name = _data["name"];
            this.mimeType = _data["mimeType"];
            this.size = _data["size"];
        }
    }

    static fromJS(data: any): MetadataModel {
        data = typeof data === 'object' ? data : {};
        let result = new MetadataModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["tempId"] = this.tempId;
        data["name"] = this.name;
        data["mimeType"] = this.mimeType;
        data["size"] = this.size;
        return data;
    }
}

export interface IMetadataModel {
    tempId?: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    size?: number;
}

export class Post implements IPost {
    id?: string;
    description?: string | undefined;
    authorId?: string;
    author?: User;
    created?: Date;
    postContents?: PostContent[] | undefined;
    postComments?: Comment[] | undefined;
    likes?: PostLike[] | undefined;

    constructor(data?: IPost) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.description = _data["description"];
            this.authorId = _data["authorId"];
            this.author = _data["author"] ? User.fromJS(_data["author"]) : <any>undefined;
            this.created = _data["created"] ? new Date(_data["created"].toString()) : <any>undefined;
            if (Array.isArray(_data["postContents"])) {
                this.postContents = [] as any;
                for (let item of _data["postContents"])
                    this.postContents!.push(PostContent.fromJS(item));
            }
            if (Array.isArray(_data["postComments"])) {
                this.postComments = [] as any;
                for (let item of _data["postComments"])
                    this.postComments!.push(Comment.fromJS(item));
            }
            if (Array.isArray(_data["likes"])) {
                this.likes = [] as any;
                for (let item of _data["likes"])
                    this.likes!.push(PostLike.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Post {
        data = typeof data === 'object' ? data : {};
        let result = new Post();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["description"] = this.description;
        data["authorId"] = this.authorId;
        data["author"] = this.author ? this.author.toJSON() : <any>undefined;
        data["created"] = this.created ? this.created.toISOString() : <any>undefined;
        if (Array.isArray(this.postContents)) {
            data["postContents"] = [];
            for (let item of this.postContents)
                data["postContents"].push(item.toJSON());
        }
        if (Array.isArray(this.postComments)) {
            data["postComments"] = [];
            for (let item of this.postComments)
                data["postComments"].push(item.toJSON());
        }
        if (Array.isArray(this.likes)) {
            data["likes"] = [];
            for (let item of this.likes)
                data["likes"].push(item.toJSON());
        }
        return data;
    }
}

export interface IPost {
    id?: string;
    description?: string | undefined;
    authorId?: string;
    author?: User;
    created?: Date;
    postContents?: PostContent[] | undefined;
    postComments?: Comment[] | undefined;
    likes?: PostLike[] | undefined;
}

export class PostContent implements IPostContent {
    id?: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    filePath?: string | undefined;
    size?: number;
    authorId?: string;
    author?: User;
    post?: Post;

    constructor(data?: IPostContent) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.mimeType = _data["mimeType"];
            this.filePath = _data["filePath"];
            this.size = _data["size"];
            this.authorId = _data["authorId"];
            this.author = _data["author"] ? User.fromJS(_data["author"]) : <any>undefined;
            this.post = _data["post"] ? Post.fromJS(_data["post"]) : <any>undefined;
        }
    }

    static fromJS(data: any): PostContent {
        data = typeof data === 'object' ? data : {};
        let result = new PostContent();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["mimeType"] = this.mimeType;
        data["filePath"] = this.filePath;
        data["size"] = this.size;
        data["authorId"] = this.authorId;
        data["author"] = this.author ? this.author.toJSON() : <any>undefined;
        data["post"] = this.post ? this.post.toJSON() : <any>undefined;
        return data;
    }
}

export interface IPostContent {
    id?: string;
    name?: string | undefined;
    mimeType?: string | undefined;
    filePath?: string | undefined;
    size?: number;
    authorId?: string;
    author?: User;
    post?: Post;
}

export class PostLike implements IPostLike {
    id?: string;
    userId?: string;
    user?: User;
    postId?: string;
    post?: Post;

    constructor(data?: IPostLike) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.userId = _data["userId"];
            this.user = _data["user"] ? User.fromJS(_data["user"]) : <any>undefined;
            this.postId = _data["postId"];
            this.post = _data["post"] ? Post.fromJS(_data["post"]) : <any>undefined;
        }
    }

    static fromJS(data: any): PostLike {
        data = typeof data === 'object' ? data : {};
        let result = new PostLike();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["userId"] = this.userId;
        data["user"] = this.user ? this.user.toJSON() : <any>undefined;
        data["postId"] = this.postId;
        data["post"] = this.post ? this.post.toJSON() : <any>undefined;
        return data;
    }
}

export interface IPostLike {
    id?: string;
    userId?: string;
    user?: User;
    postId?: string;
    post?: Post;
}

export class PostModel implements IPostModel {
    id?: string;
    description?: string | undefined;
    created?: Date;
    author?: UserAvatarModel;
    contents?: AttachExternalModel[] | undefined;
    comments?: GetCommentsRequestModel[] | undefined;
    likesCount?: number;

    constructor(data?: IPostModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.description = _data["description"];
            this.created = _data["created"] ? new Date(_data["created"].toString()) : <any>undefined;
            this.author = _data["author"] ? UserAvatarModel.fromJS(_data["author"]) : <any>undefined;
            if (Array.isArray(_data["contents"])) {
                this.contents = [] as any;
                for (let item of _data["contents"])
                    this.contents!.push(AttachExternalModel.fromJS(item));
            }
            if (Array.isArray(_data["comments"])) {
                this.comments = [] as any;
                for (let item of _data["comments"])
                    this.comments!.push(GetCommentsRequestModel.fromJS(item));
            }
            this.likesCount = _data["likesCount"];
        }
    }

    static fromJS(data: any): PostModel {
        data = typeof data === 'object' ? data : {};
        let result = new PostModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["description"] = this.description;
        data["created"] = this.created ? this.created.toISOString() : <any>undefined;
        data["author"] = this.author ? this.author.toJSON() : <any>undefined;
        if (Array.isArray(this.contents)) {
            data["contents"] = [];
            for (let item of this.contents)
                data["contents"].push(item.toJSON());
        }
        if (Array.isArray(this.comments)) {
            data["comments"] = [];
            for (let item of this.comments)
                data["comments"].push(item.toJSON());
        }
        data["likesCount"] = this.likesCount;
        return data;
    }
}

export interface IPostModel {
    id?: string;
    description?: string | undefined;
    created?: Date;
    author?: UserAvatarModel;
    contents?: AttachExternalModel[] | undefined;
    comments?: GetCommentsRequestModel[] | undefined;
    likesCount?: number;
}

export class ProblemDetails implements IProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;

    [key: string]: any;

    constructor(data?: IProblemDetails) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            for (var property in _data) {
                if (_data.hasOwnProperty(property))
                    this[property] = _data[property];
            }
            this.type = _data["type"];
            this.title = _data["title"];
            this.status = _data["status"];
            this.detail = _data["detail"];
            this.instance = _data["instance"];
        }
    }

    static fromJS(data: any): ProblemDetails {
        data = typeof data === 'object' ? data : {};
        let result = new ProblemDetails();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        for (var property in this) {
            if (this.hasOwnProperty(property))
                data[property] = this[property];
        }
        data["type"] = this.type;
        data["title"] = this.title;
        data["status"] = this.status;
        data["detail"] = this.detail;
        data["instance"] = this.instance;
        return data;
    }
}

export interface IProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;

    [key: string]: any;
}

export class Subscription implements ISubscription {
    id?: string;
    created?: Date;
    subUserId?: string;
    subUser?: User;
    userId?: string;
    user?: User;

    constructor(data?: ISubscription) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.created = _data["created"] ? new Date(_data["created"].toString()) : <any>undefined;
            this.subUserId = _data["subUserId"];
            this.subUser = _data["subUser"] ? User.fromJS(_data["subUser"]) : <any>undefined;
            this.userId = _data["userId"];
            this.user = _data["user"] ? User.fromJS(_data["user"]) : <any>undefined;
        }
    }

    static fromJS(data: any): Subscription {
        data = typeof data === 'object' ? data : {};
        let result = new Subscription();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["created"] = this.created ? this.created.toISOString() : <any>undefined;
        data["subUserId"] = this.subUserId;
        data["subUser"] = this.subUser ? this.subUser.toJSON() : <any>undefined;
        data["userId"] = this.userId;
        data["user"] = this.user ? this.user.toJSON() : <any>undefined;
        return data;
    }
}

export interface ISubscription {
    id?: string;
    created?: Date;
    subUserId?: string;
    subUser?: User;
    userId?: string;
    user?: User;
}

export class SubscriptionModel implements ISubscriptionModel {
    id?: string;
    subUserId?: string;
    userId?: string;
    user?: UserAvatarModel;
    subUser?: UserAvatarModel;

    constructor(data?: ISubscriptionModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.subUserId = _data["subUserId"];
            this.userId = _data["userId"];
            this.user = _data["user"] ? UserAvatarModel.fromJS(_data["user"]) : <any>undefined;
            this.subUser = _data["subUser"] ? UserAvatarModel.fromJS(_data["subUser"]) : <any>undefined;
        }
    }

    static fromJS(data: any): SubscriptionModel {
        data = typeof data === 'object' ? data : {};
        let result = new SubscriptionModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["subUserId"] = this.subUserId;
        data["userId"] = this.userId;
        data["user"] = this.user ? this.user.toJSON() : <any>undefined;
        data["subUser"] = this.subUser ? this.subUser.toJSON() : <any>undefined;
        return data;
    }
}

export interface ISubscriptionModel {
    id?: string;
    subUserId?: string;
    userId?: string;
    user?: UserAvatarModel;
    subUser?: UserAvatarModel;
}

export class SubscriptionRequest implements ISubscriptionRequest {
    subUserId?: string;

    constructor(data?: ISubscriptionRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.subUserId = _data["subUserId"];
        }
    }

    static fromJS(data: any): SubscriptionRequest {
        data = typeof data === 'object' ? data : {};
        let result = new SubscriptionRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["subUserId"] = this.subUserId;
        return data;
    }
}

export interface ISubscriptionRequest {
    subUserId?: string;
}

export class User implements IUser {
    id?: string;
    name?: string | undefined;
    email?: string | undefined;
    passwordHash?: string | undefined;
    birthDate?: Date;
    about?: string | undefined;
    avatar?: Avatar;
    sessions?: UserSession[] | undefined;
    posts?: Post[] | undefined;
    comments?: Comment[] | undefined;
    subscriptions?: Subscription[] | undefined;
    subscribers?: Subscription[] | undefined;
    commentLikes?: CommentLike[] | undefined;
    postLikes?: PostLike[] | undefined;

    constructor(data?: IUser) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.email = _data["email"];
            this.passwordHash = _data["passwordHash"];
            this.birthDate = _data["birthDate"] ? new Date(_data["birthDate"].toString()) : <any>undefined;
            this.about = _data["about"];
            this.avatar = _data["avatar"] ? Avatar.fromJS(_data["avatar"]) : <any>undefined;
            if (Array.isArray(_data["sessions"])) {
                this.sessions = [] as any;
                for (let item of _data["sessions"])
                    this.sessions!.push(UserSession.fromJS(item));
            }
            if (Array.isArray(_data["posts"])) {
                this.posts = [] as any;
                for (let item of _data["posts"])
                    this.posts!.push(Post.fromJS(item));
            }
            if (Array.isArray(_data["comments"])) {
                this.comments = [] as any;
                for (let item of _data["comments"])
                    this.comments!.push(Comment.fromJS(item));
            }
            if (Array.isArray(_data["subscriptions"])) {
                this.subscriptions = [] as any;
                for (let item of _data["subscriptions"])
                    this.subscriptions!.push(Subscription.fromJS(item));
            }
            if (Array.isArray(_data["subscribers"])) {
                this.subscribers = [] as any;
                for (let item of _data["subscribers"])
                    this.subscribers!.push(Subscription.fromJS(item));
            }
            if (Array.isArray(_data["commentLikes"])) {
                this.commentLikes = [] as any;
                for (let item of _data["commentLikes"])
                    this.commentLikes!.push(CommentLike.fromJS(item));
            }
            if (Array.isArray(_data["postLikes"])) {
                this.postLikes = [] as any;
                for (let item of _data["postLikes"])
                    this.postLikes!.push(PostLike.fromJS(item));
            }
        }
    }

    static fromJS(data: any): User {
        data = typeof data === 'object' ? data : {};
        let result = new User();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["email"] = this.email;
        data["passwordHash"] = this.passwordHash;
        data["birthDate"] = this.birthDate ? this.birthDate.toISOString() : <any>undefined;
        data["about"] = this.about;
        data["avatar"] = this.avatar ? this.avatar.toJSON() : <any>undefined;
        if (Array.isArray(this.sessions)) {
            data["sessions"] = [];
            for (let item of this.sessions)
                data["sessions"].push(item.toJSON());
        }
        if (Array.isArray(this.posts)) {
            data["posts"] = [];
            for (let item of this.posts)
                data["posts"].push(item.toJSON());
        }
        if (Array.isArray(this.comments)) {
            data["comments"] = [];
            for (let item of this.comments)
                data["comments"].push(item.toJSON());
        }
        if (Array.isArray(this.subscriptions)) {
            data["subscriptions"] = [];
            for (let item of this.subscriptions)
                data["subscriptions"].push(item.toJSON());
        }
        if (Array.isArray(this.subscribers)) {
            data["subscribers"] = [];
            for (let item of this.subscribers)
                data["subscribers"].push(item.toJSON());
        }
        if (Array.isArray(this.commentLikes)) {
            data["commentLikes"] = [];
            for (let item of this.commentLikes)
                data["commentLikes"].push(item.toJSON());
        }
        if (Array.isArray(this.postLikes)) {
            data["postLikes"] = [];
            for (let item of this.postLikes)
                data["postLikes"].push(item.toJSON());
        }
        return data;
    }
}

export interface IUser {
    id?: string;
    name?: string | undefined;
    email?: string | undefined;
    passwordHash?: string | undefined;
    birthDate?: Date;
    about?: string | undefined;
    avatar?: Avatar;
    sessions?: UserSession[] | undefined;
    posts?: Post[] | undefined;
    comments?: Comment[] | undefined;
    subscriptions?: Subscription[] | undefined;
    subscribers?: Subscription[] | undefined;
    commentLikes?: CommentLike[] | undefined;
    postLikes?: PostLike[] | undefined;
}

export class UserAvatarModel implements IUserAvatarModel {
    id?: string;
    name?: string | undefined;
    email?: string | undefined;
    birthDate?: Date;
    about?: string | undefined;
    postsCount?: number;
    avatarLink?: string | undefined;

    constructor(data?: IUserAvatarModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.email = _data["email"];
            this.birthDate = _data["birthDate"] ? new Date(_data["birthDate"].toString()) : <any>undefined;
            this.about = _data["about"];
            this.postsCount = _data["postsCount"];
            this.avatarLink = _data["avatarLink"];
        }
    }

    static fromJS(data: any): UserAvatarModel {
        data = typeof data === 'object' ? data : {};
        let result = new UserAvatarModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["email"] = this.email;
        data["birthDate"] = this.birthDate ? this.birthDate.toISOString() : <any>undefined;
        data["about"] = this.about;
        data["postsCount"] = this.postsCount;
        data["avatarLink"] = this.avatarLink;
        return data;
    }
}

export interface IUserAvatarModel {
    id?: string;
    name?: string | undefined;
    email?: string | undefined;
    birthDate?: Date;
    about?: string | undefined;
    postsCount?: number;
    avatarLink?: string | undefined;
}

export class UserSession implements IUserSession {
    id?: string;
    userId?: string;
    refreshToken?: string;
    created?: Date;
    isActive?: boolean;
    user?: User;

    constructor(data?: IUserSession) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.userId = _data["userId"];
            this.refreshToken = _data["refreshToken"];
            this.created = _data["created"] ? new Date(_data["created"].toString()) : <any>undefined;
            this.isActive = _data["isActive"];
            this.user = _data["user"] ? User.fromJS(_data["user"]) : <any>undefined;
        }
    }

    static fromJS(data: any): UserSession {
        data = typeof data === 'object' ? data : {};
        let result = new UserSession();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["userId"] = this.userId;
        data["refreshToken"] = this.refreshToken;
        data["created"] = this.created ? this.created.toISOString() : <any>undefined;
        data["isActive"] = this.isActive;
        data["user"] = this.user ? this.user.toJSON() : <any>undefined;
        return data;
    }
}

export interface IUserSession {
    id?: string;
    userId?: string;
    refreshToken?: string;
    created?: Date;
    isActive?: boolean;
    user?: User;
}

export interface FileParameter {
    data: any;
    fileName: string;
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