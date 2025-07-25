import { NextRequest, NextResponse } from 'next/server';

interface LogData {
  method: string;
  url: string;
  status: number;
  duration?: number;
  userAgent?: string;
  ip?: string;
  error?: string;
  userId?: string;
}

export class Logger {
  private static getClientInfo(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const ip = request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                request.headers.get('remote-addr') || 
                'Unknown';
    return { userAgent, ip };
  }

  private static getStatusColor(status: number): string {
    if (status >= 200 && status < 300) return '\x1b[32m'; // Green
    if (status >= 300 && status < 400) return '\x1b[33m'; // Yellow  
    if (status >= 400 && status < 500) return '\x1b[31m'; // Red
    if (status >= 500) return '\x1b[35m'; // Magenta
    return '\x1b[0m'; // Reset
  }

  public static logRequest(logData: LogData) {
    const timestamp = new Date().toISOString();
    const statusColor = this.getStatusColor(logData.status);
    const resetColor = '\x1b[0m';
    
    let logMessage = `[${timestamp}] ${statusColor}${logData.status}${resetColor} ${logData.method} ${logData.url}`;
    
    if (logData.duration !== undefined) {
      logMessage += ` - Duration: ${logData.duration}ms`;
    }
    
    if (logData.ip && logData.ip !== 'Unknown') {
      logMessage += ` - IP: ${logData.ip}`;
    }
    
    if (logData.userId) {
      logMessage += ` - User: ${logData.userId}`;
    }
    
    if (logData.userAgent && logData.userAgent !== 'Unknown') {
      logMessage += ` - UA: ${logData.userAgent.substring(0, 50)}...`;
    }
    
    if (logData.error) {
      logMessage += ` - Error: ${logData.error}`;
    }
    
    console.log(logMessage);
  }

  public static logApiRequest(
    request: NextRequest, 
    response: NextResponse, 
    startTime: number,
    userId?: string,
    error?: string
  ) {
    const { userAgent, ip } = this.getClientInfo(request);
    const duration = Date.now() - startTime;
    
    this.logRequest({
      method: request.method,
      url: request.url,
      status: response.status,
      duration,
      userAgent,
      ip,
      userId,
      error
    });
  }

  public static logApiResponse(
    request: NextRequest,
    status: number,
    startTime: number,
    userId?: string,
    error?: string
  ) {
    const { userAgent, ip } = this.getClientInfo(request);
    const duration = Date.now() - startTime;
    
    this.logRequest({
      method: request.method,
      url: request.url,
      status,
      duration,
      userAgent,
      ip,
      userId,
      error
    });
  }

  // Method untuk log error dengan detail lebih lengkap
  public static logError(
    request: NextRequest,
    error: any,
    startTime: number,
    userId?: string
  ) {
    const { userAgent, ip } = this.getClientInfo(request);
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Log error dengan warna merah yang lebih mencolok
    console.error(`\x1b[41m\x1b[37m[ERROR]\x1b[0m [${new Date().toISOString()}] ${request.method} ${request.url}`);
    console.error(`\x1b[31mError: ${errorMessage}\x1b[0m`);
    console.error(`Duration: ${duration}ms - IP: ${ip} - User: ${userId || 'Anonymous'}`);
    
    if (error.stack) {
      console.error(`\x1b[90mStack trace:\x1b[0m`);
      console.error(error.stack);
    }
  }

  // Method untuk log success dengan detail
  public static logSuccess(
    request: NextRequest,
    message: string,
    startTime: number,
    userId?: string
  ) {
    const { userAgent, ip } = this.getClientInfo(request);
    const duration = Date.now() - startTime;
    
    console.log(`\x1b[42m\x1b[37m[SUCCESS]\x1b[0m [${new Date().toISOString()}] ${request.method} ${request.url}`);
    console.log(`\x1b[32m${message}\x1b[0m - Duration: ${duration}ms - IP: ${ip} - User: ${userId || 'Anonymous'}`);
  }
}

// Utility function untuk wrap API handler dengan logging
export function withLogging(handler: (request: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const startTime = Date.now();
    
    try {
      const response = await handler(request);
      Logger.logApiResponse(request, response.status, startTime);
      return response;
    } catch (error) {
      Logger.logError(request, error, startTime);
      
      // Return error response
      return NextResponse.json(
        { success: false, message: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}
