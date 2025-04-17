// src/app/utils/text-utils.ts

export class TextUtils {
    static normalizeVietnamese(text: string): string {
      return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đðÐ]/g, 'd'); // replace all variants: đ, Ð, ð
        ;
    }
  
    static vietnameseIncludes(sourceText: string, keyword: string): boolean {
      if (!sourceText || !keyword) return false;
      const normalizedSource = this.normalizeVietnamese(sourceText);
      const normalizedKeyword = this.normalizeVietnamese(keyword.trim());
      return normalizedSource.includes(normalizedKeyword);
    }
  
    // ✅ Thuật toán Levenshtein Distance
    static levenshtein(a: string, b: string): number {
      const m = a.length;
      const n = b.length;
      const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  
      for (let i = 0; i <= m; i++) dp[i][0] = i;
      for (let j = 0; j <= n; j++) dp[0][j] = j;
  
      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          if (a[i - 1] === b[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1];
          } else {
            dp[i][j] = 1 + Math.min(
              dp[i - 1][j],     // Xóa
              dp[i][j - 1],     // Thêm
              dp[i - 1][j - 1]  // Thay thế
            );
          }
        }
      }
  
      return dp[m][n];
    }
  
    // ✅ Hàm so sánh gần đúng
    static fuzzyMatch(source: string, keyword: string, maxDistance = 2): boolean {
      const a = this.normalizeVietnamese(source);
      const b = this.normalizeVietnamese(keyword.trim());
      return this.levenshtein(a, b) <= maxDistance;
    }
  }
  