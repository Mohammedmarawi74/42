
/**
 * Fetches a Google Fonts CSS file and inlines the actual font data as Base64.
 * This is necessary for libraries like html-to-image because SVGs (which they use)
 * do not allow external resource loading like fonts due to security restrictions.
 */
export async function fetchAndInlineFonts(url: string): Promise<string> {
  try {
    // 1. Fetch the CSS content from Google Fonts
    const response = await fetch(url);
    if (!response.ok) return "";
    
    let cssText = await response.text();

    // 2. Find all font URLs in the CSS
    // Matches: url(https://fonts.gstatic.com/...)
    const fontUrls = cssText.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g);
    
    if (!fontUrls) return cssText;

    // Remove duplicates and clean up the URLs
    const uniqueFontUrls = [...new Set(fontUrls.map(u => 
      u.replace(/^url\(["']?/, "").replace(/["']?\)$/, "")
    ))];

    // 3. Fetch each font file and convert it to Base64
    const fontDataResults = await Promise.all(
      uniqueFontUrls.map(async (fontUrl) => {
        try {
          const fontResponse = await fetch(fontUrl);
          if (!fontResponse.ok) return null;
          
          const blob = await fontResponse.blob();
          
          return new Promise<{url: string, base64: string}>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                url: fontUrl,
                base64: reader.result as string
              });
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch (err) {
          console.error(`[FontInline] Failed to fetch font: ${fontUrl}`, err);
          return null;
        }
      })
    );

    // 4. Replace external URLs with Base64 data in the CSS (backwards replacement to avoid partial issues)
    let inlinedCSS = cssText;
    fontDataResults.forEach((result) => {
      if (result) {
        // Use a global replacement for the exact URL
        inlinedCSS = inlinedCSS.split(result.url).join(result.base64);
      }
    });

    return inlinedCSS;
  } catch (error) {
    console.error("[FontInline] Error inlining fonts:", error);
    return ""; 
  }
}
