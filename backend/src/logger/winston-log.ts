import path from 'path';
import winston from 'winston';

// Helper to extract the calling file name and line number
const formatWithCallerDetails = winston.format((info) => {
  const error = new Error();
  const stackLines = error.stack?.split('\n') || [];

  // Skip stack lines from node_modules and the logger itself
  const callerStackLine = stackLines.find(
    (line) =>
      !line.includes('node_modules') &&
      !line.includes('winston-log.ts') && // Skip the file containing the logger
      line.includes('(') // Ensure it's a valid stack trace line
  );

  const match = callerStackLine?.match(/\((.*):(\d+):(\d+)\)/);

  if (match) {
    const fullFilePath = match[1]; // Full file path
    const relativePathIndex = fullFilePath.indexOf('src'); // Find the `src` folder
    info.file = relativePathIndex !== -1 ? fullFilePath.substring(relativePathIndex) : fullFilePath;
    info.line = match[2]; // Line number
    info.column = match[3]; // Column number
  } else {
    info.file = 'unknown';
    info.line = 'unknown';
  }

  return info;
});

// Winston logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    formatWithCallerDetails(), // Add file and line number of the caller
    winston.format.printf((info) => {
      const { level, message, file, line } = info;
      return `${level}: [${file}:${line}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Add color to console logs
        winston.format.printf((info) => {
          const { level, message, file, line } = info;
          return `${level}: [${file}:${line}] ${message}`;
        })
      ),
    }),
  ],
});

// Export logger for use in other files
export default logger;
