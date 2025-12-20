import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const response = await fetch(`${process.env.NEXT_SERVER_URL}/auth/refresh`,{
            method: "POST",
            body: JSON.stringify(body),
            headers: {
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
