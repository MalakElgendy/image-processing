"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
/**
 * Custom display processor to customize the Jasmine startup log.
 * Adds a "TypeScript" prefix to the default Jasmine started message.
 */
class CustomProcessor extends jasmine_spec_reporter_1.DisplayProcessor {
    displayJasmineStarted(info, log) {
        return `TypeScript ${log}`;
    }
}
// Clear default Jasmine reporters
jasmine.getEnv().clearReporters();
// Add the SpecReporter with custom configuration and processor
jasmine.getEnv().addReporter(new jasmine_spec_reporter_1.SpecReporter({
    spec: {
        displayStacktrace: jasmine_spec_reporter_1.StacktraceOption.NONE, // Disable stack traces in spec output
    },
    customProcessors: [CustomProcessor],
}));
