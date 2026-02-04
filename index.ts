import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { emptyPluginConfigSchema } from "openclaw/plugin-sdk";

const PROVIDER_ID = "flock";
const PROVIDER_LABEL = "FLock API Platform";
const DOCS_URL = "https://docs.flock.io/flock-products/api-platform/api-endpoint";
const DEFAULT_BASE_URL = "https://api.flock.io/v1";

const flockPlugin = {
  id: "flock",
  name: "FLock Provider",
  description: "FLock API Platform provider plugin (OpenAI-compatible)",
  configSchema: emptyPluginConfigSchema(),
  register(api: OpenClawPluginApi) {
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
                        {
                          id: "minimax-m2.1",
                          name: "MiniMax M2.1",
                          input: ["text"],
                          contextWindow: 131072,
                          maxTokens: 8192,
                        },
                        {
                          id: "deepseek-v3.2",
                          name: "DeepSeek V3.2",
                          input: ["text"],
                          contextWindow: 131072,
                          maxTokens: 8192,
                        },
                        {
                          id: "kimi-k2-thinking",
                          name: "Kimi K2 Thinking",
                          reasoning: true,
                          input: ["text"],
                          contextWindow: 131072,
                          maxTokens: 8192,
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
};

export default flockPlugin;
