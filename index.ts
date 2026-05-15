import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";

const PROVIDER_ID = "flock";
const PROVIDER_LABEL = "FLock API Platform";
const DOCS_URL = "https://docs.flock.io/flock-products/api-platform/api-endpoint";
const DEFAULT_BASE_URL = "https://api.flock.io/v1";

export default definePluginEntry({
  id: PROVIDER_ID,
  name: "FLock Provider",
  description: "FLock API Platform provider plugin (OpenAI-compatible)",
  register(api) {
    api.registerProvider({
      id: PROVIDER_ID,
      label: PROVIDER_LABEL,
      docsPath: DOCS_URL,
      auth: [
        {
          id: "api_key",
          label: "API Key",
          hint: "Enter your FLock API key",
          kind: "api_key",
          run: async (ctx) => {
            const apiKey = await ctx.prompter.text({
              message: "FLock API key",
              validate: (value) => {
                const trimmed = value?.trim();
                if (!trimmed) return "API key is required";
                return undefined;
              },
            });

            const key = apiKey.trim();
            const profileId = `${PROVIDER_ID}:default`;

            return {
              profiles: [
                {
                  profileId,
                  credential: {
                    type: "api_key",
                    provider: PROVIDER_ID,
                    key,
                  },
                },
              ],
              configPatch: {
                models: {
                  mode: "merge",
                  providers: {
                    [PROVIDER_ID]: {
                      baseUrl: DEFAULT_BASE_URL,
                      api: "openai-completions",
                      models: [
                        // Reasoning / thinking models
                        {
                          id: "qwen3-235b-a22b-thinking-2507",
                          name: "Qwen 3 235B Thinking",
                          reasoning: true,
                          input: ["text"],
                          contextWindow: 131072,
                          maxTokens: 8192,
                          cost: { input: 0.23, output: 2.3, cacheRead: 0, cacheWrite: 0 },
                        },
                        {
                          id: "qwen3-235b-a22b-thinking-qwfin",
                          name: "Qwen 3 235B Thinking (QWFin)",
                          reasoning: true,
                          input: ["text"],
                          contextWindow: 131072,
                          maxTokens: 8192,
                          cost: { input: 0.23, output: 2.3, cacheRead: 0, cacheWrite: 0 },
                        },
                        {
                          id: "kimi-k2-thinking",
                          name: "Kimi K2 Thinking",
                          reasoning: true,
                          input: ["text"],
                          contextWindow: 131072,
                          maxTokens: 8192,
                          cost: { input: 0.6, output: 2.5, cacheRead: 0, cacheWrite: 0 },
                        },
                        // Instruct / chat models
                        {
                          id: "qwen3-30b-a3b-instruct-2507",
                          name: "Qwen 3 30B Instruct",
                          reasoning: false,
                          input: ["text"],
                          contextWindow: 131072,
                          maxTokens: 8192,
                          cost: { input: 0.2, output: 0.8, cacheRead: 0, cacheWrite: 0 },
                        },
                        {
                          id: "qwen3-235b-a22b-instruct-2507",
                          name: "Qwen 3 235B Instruct",
                          reasoning: false,
                          input: ["text"],
                          contextWindow: 131072,
                          maxTokens: 8192,
                          cost: { input: 0.7, output: 2.8, cacheRead: 0, cacheWrite: 0 },
                        },
                        {
                          id: "qwen3-30b-a3b-instruct-qmxai",
                          name: "Qwen 3 30B Instruct (QMXAI)",
                          reasoning: false,
                          input: ["text"],
                          contextWindow: 131072,
                          maxTokens: 8192,
                          cost: { input: 0.2, output: 0.8, cacheRead: 0, cacheWrite: 0 },
                        },
                        {
                          id: "qwen3-30b-a3b-instruct-coding",
                          name: "Qwen 3 30B Coding",
                          reasoning: false,
                          input: ["text"],
                          contextWindow: 131072,
                          maxTokens: 8192,
                          cost: { input: 0.2, output: 0.8, cacheRead: 0, cacheWrite: 0 },
                        },
                        {
                          id: "qwen3-30b-a3b-instruct-qmini",
                          name: "Qwen 3 30B Instruct (QMini)",
                          reasoning: false,
                          input: ["text"],
                          contextWindow: 131072,
                          maxTokens: 8192,
                          cost: { input: 0.2, output: 0.8, cacheRead: 0, cacheWrite: 0 },
                        },
                        // Other
                        {
                          id: "deepseek-v3.2",
                          name: "DeepSeek V3.2",
                          reasoning: false,
                          input: ["text"],
                          contextWindow: 131072,
                          maxTokens: 8192,
                          cost: { input: 0.28, output: 0.42, cacheRead: 0, cacheWrite: 0 },
                        },
                        {
                          id: "deepseek-v3.2-dsikh",
                          name: "DeepSeek V3.2 (DSIKH)",
                          reasoning: false,
                          input: ["text"],
                          contextWindow: 131072,
                          maxTokens: 8192,
                          cost: { input: 0.28, output: 0.42, cacheRead: 0, cacheWrite: 0 },
                        },
                        {
                          id: "minimax-m2.1",
                          name: "MiniMax M2.1",
                          reasoning: false,
                          input: ["text"],
                          contextWindow: 131072,
                          maxTokens: 8192,
                          cost: { input: 0.3, output: 1.2, cacheRead: 0, cacheWrite: 0 },
                        },
                      ],
                    },
                  },
                },
              },
              notes: [
                `FLock API configured at ${DEFAULT_BASE_URL}.`,
                "Add models to models.providers.flock.models in your config, or use flock/<model-id> format.",
                "See FLock docs for available models: " + DOCS_URL,
              ],
            };
          },
        },
      ],
    });
  },
});
