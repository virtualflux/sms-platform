import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const token = req.headers.get('Authorization')?.replace(/"/g, '');
        const body = await req.json();

        const response = await fetch(`${process.env.NEXT_SERVER_URL}/wallet/low-balance-reminder`,{
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

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get('Authorization')?.replace(/"/g, '');

        const backendUrl = `${process.env.NEXT_SERVER_URL}/wallet/low-balance-reminder`;

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

export async function DELETE(req: NextRequest) {
    try {
        const token = req.headers.get('Authorization')?.replace(/"/g, '');
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id'); 

        const response = await fetch(`${process.env.NEXT_SERVER_URL}/wallet/low-balance-reminder/${id}`,{
            method: "DELETE",
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