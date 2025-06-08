import { Pipe, PipeTransform } from '@angular/core';

/**
 * Truncates text to a given number of lines, approximating via maximum characters per line.
 * Usage in template:
 *   {{ someLongText | clampLines: 3: 40 }}
 * This will limit to 3 lines, estimating 40 characters per line.
 */
@Pipe({
    name: 'clampLines'
})
export class ClampLinesPipe implements PipeTransform {
    transform(
        value: string | null | undefined,
        maxLines: number = 3,
        charsPerLine: number = 40
    ): string {
        if (!value) {
            return '';
        }

        // Split into words for line building
        const words = value.split(/\s+/);
        const lines: string[] = [];
        let currentLine = '';

        for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            if (testLine.length <= charsPerLine) {
                currentLine = testLine;
            } else {
                lines.push(currentLine);
                currentLine = word;
                if (lines.length === maxLines) {
                    break;
                }
            }
        }
        // push remaining line if under limit
        if (lines.length < maxLines && currentLine) {
            lines.push(currentLine);
        }

        // Build the result and append ellipsis if truncated
        const wasTruncated = lines.join(' ').length < value.length;
        let result = lines.slice(0, maxLines).join('\n');

        if (wasTruncated) {
            const lastIndex = result.lastIndexOf('\n');
            if (lastIndex >= 0) {
                // Trim trailing whitespace on the last line before adding “…”
                const lastLine = result
                    .substring(lastIndex + 1)
                    .replace(/\s+$/, '');
                result =
                    result.substring(0, lastIndex + 1) +
                    lastLine +
                    '...';
            } else {
                result = result.replace(/\s+$/, '') + '...';
            }
        }

        return result;
    }
}
