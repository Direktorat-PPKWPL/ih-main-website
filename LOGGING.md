# Logging System Documentation

## Overview
Sistem logging yang telah diimplementasikan pada aplikasi Infrastruktur Hijau memberikan monitoring lengkap untuk request HTTP, response, dan error handling.

## Features

### 1. HTTP Request/Response Logging
- **Status Code Monitoring**: Semua request dicatat dengan status code (200, 400, 500, dll)
- **Color-coded Output**: 
  - 🟢 Green (2xx): Success responses
  - 🟡 Yellow (3xx): Redirect responses  
  - 🔴 Red (4xx): Client error responses
  - 🟣 Magenta (5xx): Server error responses

### 2. Detailed Request Information
- **Timestamp**: ISO format timestamp untuk setiap request
- **HTTP Method**: GET, POST, PUT, DELETE, etc.
- **URL**: Full request URL
- **Duration**: Response time dalam milliseconds
- **IP Address**: Client IP address
- **User Agent**: Browser/client information
- **User ID**: Authenticated user identifier (jika ada)

### 3. Error Logging
- **Detailed Error Messages**: Full error description
- **Stack Traces**: Untuk debugging (hanya di development)
- **Error Context**: Request information saat error terjadi
- **User Context**: User yang mengalami error

## Implementation

### Middleware Logging
File `middleware.ts` mencatat semua request yang melalui middleware dengan informasi:
```typescript
[2025-01-24T10:30:45.123Z] 200 GET http://localhost:3000/dashboard/admin - Duration: 245ms - IP: 192.168.1.100
```

### API Route Logging
Setiap API route menggunakan `Logger` class dari `lib/logger.ts`:

#### Success Logging:
```typescript
Logger.logSuccess(request, 'User logged in successfully', startTime, userId);
```

#### Error Logging:
```typescript
Logger.logError(request, error, startTime, userId);
```

#### Response Logging:
```typescript
Logger.logApiResponse(request, status, startTime, userId, errorMessage);
```

## Log Examples

### Successful Login:
```
[SUCCESS] [2025-01-24T10:30:45.123Z] POST http://localhost:3000/api/auth/login
User admin@example.com logged in successfully - Duration: 156ms - IP: 192.168.1.100 - User: 1
```

### Failed Authentication:
```
[2025-01-24T10:30:45.123Z] 401 POST http://localhost:3000/api/auth/login - Duration: 89ms - IP: 192.168.1.100 - Error: Authentication failed
```

### Server Error:
```
[ERROR] [2025-01-24T10:30:45.123Z] POST http://localhost:3000/api/auth/register
Error: Database connection failed - Duration: 234ms - IP: 192.168.1.100 - User: Anonymous
Stack trace:
  at DatabaseConnection.connect (/app/lib/db.js:45:12)
  at AuthService.register (/app/lib/auth.js:123:8)
```

### Page Access:
```
[2025-01-24T10:30:45.123Z] 200 GET http://localhost:3000/dashboard/admin - Duration: 45ms - IP: 192.168.1.100
```

## Environment Configuration

Dalam file `.env.local`:
```env
# Logging Configuration
LOG_LEVEL=debug
ENABLE_REQUEST_LOGGING=true
ENABLE_ERROR_STACK_TRACE=true
```

## Running with Enhanced Logging

### Development Mode:
```bash
npm run dev          # Normal development
npm run dev:verbose  # Verbose logging
```

### Production Mode:
```bash
npm run build        # Build application
npm run start        # Normal production
npm run start:verbose # Verbose production logging
```

## API Routes with Logging

### Authentication Routes:
- ✅ `/api/auth/login` - Login attempts, successes, failures
- ✅ `/api/auth/register` - Registration attempts, validation errors
- ✅ `/api/auth/logout` - Logout actions

### Dashboard Routes:
- ✅ All dashboard pages with access control logging
- ✅ Role-based access violations
- ✅ Redirect logging

## Monitoring Tips

### 1. Real-time Monitoring:
Gunakan terminal untuk melihat log real-time saat development:
```bash
npm run dev
# Buka terminal kedua untuk monitoring log files
tail -f .next/server.log
```

### 2. Error Tracking:
Filter error logs untuk debugging:
```bash
# Windows PowerShell
npm run dev 2>&1 | Select-String "ERROR"

# Linux/Mac
npm run dev 2>&1 | grep "ERROR"
```

### 3. Performance Monitoring:
Monitor request duration untuk optimasi:
```bash
# Filter requests yang lambat (>1000ms)
npm run dev 2>&1 | Select-String "Duration: [1-9][0-9]{3,}ms"
```

## Security Considerations

1. **Sensitive Data**: Password dan token tidak dicatat dalam log
2. **IP Logging**: IP address dicatat untuk security monitoring
3. **User Context**: User ID dicatat untuk audit trail
4. **Error Details**: Stack trace hanya ditampilkan di development mode

## Troubleshooting

### Common Issues:

1. **Log tidak muncul**: Pastikan `ENABLE_REQUEST_LOGGING=true` di environment
2. **Performance impact**: Logging minimal impact, namun bisa dimatikan di production jika diperlukan
3. **Log file size**: Implement log rotation jika diperlukan untuk production

### Debug Mode:
```bash
DEBUG=* npm run dev  # Enable all debug messages
```

## Future Enhancements

1. **Log File Rotation**: Implement daily/weekly log rotation
2. **Log Aggregation**: Send logs to external services (ELK stack, CloudWatch)
3. **Performance Metrics**: Add detailed performance monitoring
4. **Alert System**: Automated alerts untuk error patterns
5. **Dashboard**: Web interface untuk log analysis
