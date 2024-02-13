import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export function toArray(headers?: HeadersInit): [string, string][] {
  if (!headers) {
    return [];
  }

  let values: [string, string][] = [];

  if (headers instanceof Headers) {
    for (const entry of headers.entries()) {
      values.push(entry);
    }
  } else if (Array.isArray(headers)) {
    headers.forEach((header: string[]) => {
      const value: [string, string] = [header?.[0] ?? '', header?.[1] || ''];
      values.push(value);
    });
  } else {
    values = Object.entries(headers);
  }

  return values;
}

export default async function handler(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url);
  url.pathname = '';
  const headers = toArray(request.headers);
  const data = await fetch(`${url}/api/example-node`, { headers: headers });
  const text = await data.text();

  return new NextResponse(
    `${text} Headers ${headers
      .map(([key, value]: [string, string]) => `${key}:${value}`)
      .join('\n')}`,
    { status: 200 }
  );
}
