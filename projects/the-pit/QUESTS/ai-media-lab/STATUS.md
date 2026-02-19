# STATUS — ai-media-lab

- State: Active
- NEXT:
  1) Document: what OpenClaw can do today for image understanding vs image generation (configurable surfaces).
  2) Decide: generation path (Gemini image model vs Imagen) with **manual script**, rate limited.
- BLOCKED BY:
  - Need to identify working Google endpoint/model id for generation with current key/project.
  - OpenClaw `functions.image` appears pinned to Anthropic in this environment.
- Deploy target:
  - Standalone canon project in `mac-brain/projects/ai-media-lab/` (or similar)
  - Mounted wrapper in `mac-brain/projects/homestretch-proposals/notes/`
