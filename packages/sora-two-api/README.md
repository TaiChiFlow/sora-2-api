# sora-two-api

Minimal TypeScript SDK for the Evolink **Sora 2 API** (model: `sora-2`).

Links:

- https://evolink.ai/sora-2
- https://evolink.ai/api-reference/sora-2/sora-2-API-Reference.md

## Install

```bash
npm install sora-two-api
```

## Usage

```ts
import { createSoraTwoClient } from 'sora-two-api';

const client = createSoraTwoClient({
  baseUrl: 'https://api.evolink.ai',
  apiKey: process.env.SORA_TWO_API_KEY!,
});

// 1) Create an async generation task
const task = await client.createVideo({
  prompt: 'A cat playing piano',
  aspect_ratio: '16:9',
  duration: 10,
  remove_watermark: true,
});

// 2) Poll task status until completed, then download results quickly
const detail = await client.getTask(task.id);

console.log({
  id: task.id,
  status: detail.status,
  progress: detail.progress,
  results: detail.results,
});
```

## License

MIT
