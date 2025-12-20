import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get('Authorization')?.replace(/"/g, '');
        const { searchParams } = new URL(req.url);
        const query = searchParams.toString(); 

        const backendUrl = `${process.env.NEXT_SERVER_URL}/wallet/transactions${query ? "?" + query : ""}`;

        const response = await fetch(backendUrl,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        const res = await response.json()
        
        return new Response(JSON.stringify(res),{
            status: response?.status,
            statusText: response?.statusText,
            headers: {
                'Content-Type': 'application/json',
            }
        })

    } catch (error: any) {
        console.error('[API POST ERROR]', error);
        return new Response(JSON.stringify(error),{
            status: 500,
            statusText: "Internal server error",
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}

export async function POST(req: NextRequest) {
    try {
        const token = req.headers.get('Authorization')?.replace(/"/g, '');
        const body = await req.json();

        const response = await fetch(`${process.env.NEXT_SERVER_URL}/wallet/topup`,{
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        const res = await response.json()
        
        return new Response(JSON.stringify(res),{
            status: response?.status,
            statusText: response?.statusText,
            headers: {
                'Content-Type': 'application/json',
            }
        })

    } catch (error: any) {
        console.error('[API POST ERROR]', error);
        return new Response(JSON.stringify(error),{
            status: 500,
            statusText: "Internal server error",
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}