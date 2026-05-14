"""FLock API Platform provider profile for Hermes Agent.

FLock exposes an OpenAI-compatible API at https://api.flock.io/v1, so the
default `api_mode="chat_completions"` and `auth_type="api_key"` from
ProviderProfile work without overrides.

Installed under `$HERMES_HOME/plugins/model-providers/flock/` or bundled via
`pip install`. See plugin.yaml for manifest.
"""

from providers import register_provider
from providers.base import ProviderProfile

flock = ProviderProfile(
    name="flock",
    aliases=("flock-io", "flockio"),
    display_name="FLock API Platform",
    description="FLock API Platform — federated AI inference (OpenAI-compatible)",
    signup_url="https://docs.flock.io/flock-products/api-platform",
    env_vars=("FLOCK_API_KEY",),
    base_url="https://api.flock.io/v1",
    auth_type="api_key",
    fallback_models=(
        # Reasoning / thinking
        "qwen3-235b-a22b-thinking-2507",
        "qwen3-235b-a22b-thinking-qwfin",
        "kimi-k2-thinking",
        # Instruct / chat
        "qwen3-30b-a3b-instruct-2507",
        "qwen3-235b-a22b-instruct-2507",
        "qwen3-30b-a3b-instruct-qmxai",
        "qwen3-30b-a3b-instruct-coding",
        "qwen3-30b-a3b-instruct-qmini",
        # Other
        "deepseek-v3.2",
        "deepseek-v3.2-dsikh",
        "minimax-m2.1",
    ),
    default_aux_model="qwen3-30b-a3b-instruct-2507",
)

register_provider(flock)
