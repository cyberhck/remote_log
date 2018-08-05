enum LogLevel {
    DEBUG = 1,
    INFO = 2,
    NOTICE = 3,
    WARNING = 4,
    ERROR = 5,
    CRITICAL = 6,
    ALERT = 7,
    EMERGENCY = 8

}
interface ILog {
    tag: string;
    level: LogLevel;
    message: string;
}

export class Logger {
    private logs: ILog[] = [];
    private hooks: ((log: ILog) => void)[] = [];

    public addLog(tag: string, message: string, level: LogLevel = LogLevel.INFO) {
        this.logs = this.logs.concat({tag, level, message})
    }

    public getAllLogs(): ILog[] {
        return this.logs;
    }

    public addBeforeLogHook(hook: (log: ILog) => void) {
        this.hooks = this.hooks.concat(hook);
    }

    public static parseLevel(level: string): LogLevel {
        switch (level.toLowerCase()) {
            case "debug":
                return LogLevel.DEBUG;
            case "info":
                return LogLevel.INFO;
            case "notice":
                return LogLevel.NOTICE;
            case "warn":
            case "warning":
                return LogLevel.WARNING;
            case "error":
                return LogLevel.ERROR;
            case "ciritical":
                return LogLevel.CRITICAL;
            case "alert":
                return LogLevel.ALERT;
            case "emergency":
                return LogLevel.EMERGENCY;
            default:
                return LogLevel.DEBUG
        }
    }
    public static valid(log: any): boolean {
        if (!log.tag || log.tag.length < 1) {
            return false;
        }
        if (!log.level || typeof log.level != "number" || log.level < 1 || log.level > 8) {
            return false;
        }
        return !(!log.message || log.message.length < 1);

    }
}
