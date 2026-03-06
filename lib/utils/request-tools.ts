function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  // x-forwarded-for can contain multiple IPs, get the first one
  if (forwardedFor) return forwardedFor.split(',')[0].trim();

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;

  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp;

  return 'unknown';
}

export function requestTools(request: Request): { ipAddress: string; userAgent: string } {
  const ipAddress = getClientIp(request);

  const userAgent = request.headers.get('user-agent') || 'unknown';

  return { ipAddress, userAgent };
}
