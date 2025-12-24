import jwt from 'jsonwebtoken';

export class JWTService {
  private static readonly ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'fallback_access_secret';
  private static readonly REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret';

  static signAccessToken(payload: any): string {
    return jwt.sign(payload, this.ACCESS_SECRET, { expiresIn: '1h' });
  }

  static signRefreshToken(payload: any): string {
    return jwt.sign(payload, this.REFRESH_SECRET, { expiresIn: '7d' });
  }

  static verifyAccessToken(token: string): any {
    try {
      return jwt.verify(token, this.ACCESS_SECRET);
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired');
      }
      throw new Error('Invalid token');
    }
  }

  static verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, this.REFRESH_SECRET);
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Refresh token expired');
      }
      throw new Error('Invalid refresh token');
    }
  }
}
