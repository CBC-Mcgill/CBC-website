export const generateFallbackSvg = (label: string): string => {
  const safe = (label || 'CBC Member').replace(/[^a-zA-Z0-9 ]/g, '');
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' width='480' height='600' viewBox='0 0 480 600'>" +
    "<rect width='100%' height='100%' fill='%23f3e7db'/>" +
    "<circle cx='240' cy='220' r='74' fill='%23d8c5b2'/>" +
    "<rect x='130' y='320' width='220' height='180' rx='110' fill='%23d8c5b2'/>" +
    "<text x='50%' y='548' font-family='Fraunces,serif' font-size='22' fill='%238a7f75' text-anchor='middle' letter-spacing='2'>" +
    safe +
    '</text></svg>';
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
