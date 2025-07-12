
import type { Logger } from '../../modules/shared/logger/logger';
import process from 'node:process';
import { createLogger, wrapWithLoggerContext } from '../../modules/shared/logger/logger';

export { runScript };
async function runScript(
  { scriptName }: { scriptName: string },
  fn: (args: { isDryRun: boolean; logger: Logger; }) => Promise<void> | void,
) {
  const isDryRun = process.argv.includes('--dry-run');

  wrapWithLoggerContext(
    {
      scriptName,
      isDryRun,
    },
    async () => {
      const logger = createLogger({ namespace: 'scripts' });


      try {
        logger.info('Script started');
        await fn({ isDryRun, logger});
        logger.info('Script finished');
      } catch (error) {
        logger.error({ error }, 'Script failed');
        process.exit(1);
      } finally {

      }
    },
  );
}
