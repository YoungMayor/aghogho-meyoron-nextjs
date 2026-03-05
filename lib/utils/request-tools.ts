export function requestTools(request: Request): { ipAddress: string; userAgent: string } {
  const ipAddress =
    request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  const userAgent = request.headers.get('user-agent') || 'unknown';

  return { ipAddress, userAgent };
}
