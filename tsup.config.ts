import { defineConfig } from "tsup";

export default defineConfig({
    entry: ['src/speed.ts'],
    target: 'ios16',
})
