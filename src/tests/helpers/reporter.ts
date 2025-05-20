import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.SuiteInfo;
/**
 * Custom display processor to customize the Jasmine startup log.
 * Adds a "TypeScript" prefix to the default Jasmine started message.
 */
class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `TypeScript ${log}`;
  }
}
// Clear default Jasmine reporters
jasmine.getEnv().clearReporters();
// Add the SpecReporter with custom configuration and processor
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE, // Disable stack traces in spec output
    },
    customProcessors: [CustomProcessor],
  }),
);
