# Sora Two API (Sora 2 API) — TypeScript SDK + Playground UI

English | [中文](./README.zh-CN.md)

This repository is a lightweight **Sora 2 API** (model: `sora-2`) SDK + demo UI, intentionally packaged like an open-source project while clearly linking out to the official pages.

**Official Sora 2 page (access / pricing / docs):** https://evolink.ai/sora-2  
**Sora 2 API Reference (OpenAPI markdown):** https://evolink.ai/api-reference/sora-2/sora-2-API-Reference.md

## Table of contents

- [What is the Sora 2 API?](#what-is-the-sora-2-api)
- [Quick start](#quick-start)
- [API overview](#api-overview)
- [Endpoints](#endpoints)
- [Auth (Bearer API Key)](#auth-bearer-api-key)
- [Examples](#examples)
- [Limitations & notes](#limitations--notes)
- [FAQ](#faq)

## What is the Sora 2 API?

**Sora 2 API** is an **asynchronous** video generation API. You create a generation task, receive a **task ID**, then query the task status until it’s **completed** and retrieve result URLs.

Key points (from the official docs):

- Tasks are async: create → poll status by task ID.
- Generated video links are time-limited (valid for **24 hours**), so save/download promptly.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## API overview

The Evolink Sora 2 API uses:

- **Base URL**: `https://api.evolink.ai`
- **Model**: `sora-2`
- **Auth**: `Authorization: Bearer YOUR_API_KEY`

This repo includes:

- `packages/sora-two-api`: TypeScript SDK (fetch-based, typed)
- `packages/examples`: Next.js + Tailwind landing + mini playground (with external links)

## Endpoints

| Purpose                       | Method | Path                     |
| ----------------------------- | -----: | ------------------------ |
| Create Sora 2 generation task |   POST | `/v1/videos/generations` |
| Query task status / results   |    GET | `/v1/tasks/{task_id}`    |

## Auth (Bearer API Key)

1. Create/get your API key in the dashboard: https://evolink.ai/dashboard/keys
2. Send it on every request:

```http
Authorization: Bearer YOUR_API_KEY
```

## Examples

### 1) cURL: create a Sora 2 generation task (text-to-video)

```bash
curl -X POST "https://api.evolink.ai/v1/videos/generations" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sora-2",
    "prompt": "A cat playing piano",
    "aspect_ratio": "16:9",
    "duration": 10,
    "remove_watermark": true
  }'
```

### 2) cURL: query task status

```bash
curl "https://api.evolink.ai/v1/tasks/TASK_ID" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### 3) TypeScript SDK (this repo)

```ts
import { createSoraTwoClient } from 'sora-two-api';

const client = createSoraTwoClient({
  baseUrl: 'https://api.evolink.ai',
  apiKey: process.env.SORA_TWO_API_KEY!,
});

// create task
const task = await client.createVideo({
  prompt: 'A cat playing piano',
  aspect_ratio: '16:9',
  duration: 10,
  remove_watermark: true,
});

// poll status
const detail = await client.getTask(task.id);
console.log(detail.status, detail.progress, detail.results);
```

### Common request fields (Sora 2)

- `prompt` (string, max ~5000): describes the target video
- `aspect_ratio` (`16:9` or `9:16`): landscape/portrait
- `image_urls` (array, max 1): reference image URL for image-to-video
- `duration` (number): docs mention `10` or `15` seconds
- `remove_watermark` (boolean): `true` removes watermark (higher pricing), `false` keeps watermark
- `callback_url` (HTTPS): optional webhook callback when task completes/fails/cancels

## Limitations & notes

According to the official docs:

- Content moderation can be strict, so tasks may fail.
- Image input containing real human figures is not currently supported.
- `callback_url` must be HTTPS and cannot target internal/private IP addresses.

## FAQ

### Is Sora 2 API synchronous?

No. It’s asynchronous: you receive a task ID and then query `/v1/tasks/{task_id}` until `status` becomes `completed`.

### How long are result URLs valid?

Result links are valid for **24 hours**. Download/save promptly after completion.

### Where is the official documentation?

- Sora 2 page: https://evolink.ai/sora-2
- API reference: https://evolink.ai/api-reference/sora-2/sora-2-API-Reference.md

## License

MIT
