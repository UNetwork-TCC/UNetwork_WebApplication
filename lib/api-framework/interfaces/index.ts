import { IUser } from "@/models/interfaces";
import { NextRequest, NextResponse } from "next/server";

export type Params = Record<string, string> | Promise<Record<string, string>>

export interface ControllerMethodParams {
    request: NextRequest;
    url: URL;
    params: Params;
    body?: unknown;
    searchParams: URLSearchParams | Promise<URLSearchParams>;
    user?: IUser;
}


export interface RouteParams {
    params: Params;
}

export interface HttpHandler {
    (request: NextRequest, context?: unknown): Promise<NextResponse>;
}