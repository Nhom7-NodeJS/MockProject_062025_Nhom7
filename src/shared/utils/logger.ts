import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// ANSI color codes
const Colors = {
    RED: '\x1b[31m',
    GREEN: '\x1b[32m',
    YELLOW: '\x1b[33m',
    BLUE: '\x1b[34m',
    MAGENTA: '\x1b[35m',
    CYAN: '\x1b[36m',
    WHITE: '\x1b[37m',
    GRAY: '\x1b[90m',
    RESET: '\x1b[0m',
};

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogOptions {
    timestamp?: boolean;
    consoleOutput?: boolean;
    fileOutput?: boolean;
    logDir?: string;
    level?: LogLevel;
}

const LOG_LEVELS: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};

const defaultOptions: Required<LogOptions> = {
    timestamp: true,
    consoleOutput: true,
    fileOutput: false,
    logDir: 'logs',
    level: 'info'
};

const levelColors: Record<LogLevel, string> = {
    debug: Colors.GRAY,
    info: Colors.BLUE,
    warn: Colors.YELLOW,
    error: Colors.RED,
};

class Logger {
    private options: Required<LogOptions>;
    private fileStream: NodeJS.WritableStream | null = null;

    constructor(options: LogOptions = {}) {
        this.options = { ...defaultOptions, ...options };
        this.initializeFileOutput();
    }

    private initializeFileOutput() {
        if (this.options.fileOutput) {
            try {
                // Ensure log directory exists
                if (!existsSync(this.options.logDir)) {
                    mkdirSync(this.options.logDir, { recursive: true });
                }

                const now = new Date();
                const pad = (num: number) => num.toString().padStart(2, '0');
                const dateString = [
                    now.getFullYear(),
                    pad(now.getMonth() + 1),
                    pad(now.getDate())
                ].join('-');
                const logFile = join(this.options.logDir, `${dateString}.log`);
                this.fileStream = createWriteStream(logFile, { flags: 'a' });
            } catch (error) {
                console.error('Failed to initialize file logging:', error);
            }
        }
    }

    private formatTimestamp(): string {
        const now = new Date();
        const pad = (num: number) => num.toString().padStart(2, '0');
        const date = [
            now.getFullYear(),
            pad(now.getMonth() + 1),
            pad(now.getDate())
        ].join('-');
        const time = [
            pad(now.getHours()),
            pad(now.getMinutes()),
            pad(now.getSeconds())
        ].join(':');
        return `[${date} ${time}]`;
    }

    private writeToFile(level: LogLevel, message: string) {
        if (this.fileStream) {
            const logMessage = `${this.formatTimestamp()} [${level.toUpperCase()}] ${message}\n`;
            this.fileStream.write(logMessage);
        }
    }

    private log(level: LogLevel, message: string, ...args: any[]) {
        // Skip if log level is below the minimum configured level
        const currentLevel = this.options.level || 'info';
        if (LOG_LEVELS[level] < LOG_LEVELS[currentLevel]) {
            return;
        }

        const color = levelColors[level] || Colors.RESET;
        const timestamp = this.options.timestamp ? `${Colors.GRAY}${this.formatTimestamp()}${Colors.RESET} ` : '';
        const levelStr = `${color}[${level.toUpperCase()}]${Colors.RESET}`;
        
        const formattedMessage = `${timestamp}${levelStr} ${message}`;

        if (this.options.consoleOutput) {
            const logFn = level === 'error' ? console.error : 
                         level === 'warn' ? console.warn : 
                         console.log;
            
            logFn(formattedMessage, ...args);
        }

        if (this.options.fileOutput) {
            this.writeToFile(level, `${message} ${args.join(' ')}`.trim());
        }
    }

    // Public logging methods
    debug(message: string, ...args: any[]) {
        this.log('debug', message, ...args);
    }

    info(message: string, ...args: any[]) {
        this.log('info', message, ...args);
    }

    warn(message: string, ...args: any[]) {
        this.log('warn', message, ...args);
    }

    error(message: string | Error, ...args: any[]) {
        const errorMessage = message instanceof Error ? `${message.name}: ${message.message}\n${message.stack}` : message;
        this.log('error', errorMessage, ...args);
    }

    // Additional context methods
    http(message: string, ...args: any[]) {
        this.log('info', `[HTTP] ${message}`, ...args);
    }

    db(message: string, ...args: any[]) {
        this.log('debug', `[DB] ${message}`, ...args);
    }

    // Update options at runtime
    updateOptions(newOptions: Partial<LogOptions>) {
        const prevFileOutput = this.options.fileOutput;
        this.options = { ...this.options, ...newOptions };
        
        if (this.options.fileOutput !== prevFileOutput) {
            if (this.options.fileOutput) {
                this.initializeFileOutput();
            } else if (this.fileStream) {
                this.fileStream.end();
                this.fileStream = null;
            }
        }
    }
}

// Create a default logger instance
const logger = new Logger({
    timestamp: true,
    consoleOutput: true,
    fileOutput: false,
    logDir: 'logs',
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
});

export { Logger, logger as default };
