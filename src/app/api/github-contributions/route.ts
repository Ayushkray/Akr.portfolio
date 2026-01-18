// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const username = searchParams.get('username');

//   if (!username) {
//     return NextResponse.json({ error: 'Username is required' }, { status: 400 });
//   }

//   try {
//     const response = await fetch(`https://github-contributions.vercel.app/api/v1/${username}`, {
//       headers: {
//         'User-Agent': 'Next.js-GitHub-Portfolio',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`GitHub API responded with status: ${response.status}`);
//     }

//     const data = await response.json();
    
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('Error fetching GitHub contributions:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch GitHub contributions' },
//       { status: 500 }
//     );
//   }
// }








import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // optional for performance

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://github-contributions.vercel.app/api/v1/${username}`, {
      headers: { 'User-Agent': 'Next.js-GitHub-Portfolio' },
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `GitHub API responded with status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' },
    });
  } catch (error: unknown) {
    console.error('Error fetching GitHub contributions:', error);
    const message =
      error instanceof Error ? error.message : String(error ?? 'Failed to fetch GitHub contributions');
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
