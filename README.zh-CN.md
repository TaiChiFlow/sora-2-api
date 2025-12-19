# Sora Two API（Sora 2 API）— TypeScript SDK + Playground UI

[English](./README.md) | 中文

本仓库提供一个轻量的 **Sora 2 API**（模型：`sora-2`）TypeScript SDK + 前端演示 UI，并刻意以“开源仓库”的形式组织内容，同时在关键位置放置外链入口。

**官方 Sora 2 页面（访问 / 价格 / 说明）：** https://evolink.ai/sora-2  
**Sora 2 API 参考文档（OpenAPI Markdown）：** https://evolink.ai/api-reference/sora-2/sora-2-API-Reference.md

## 目录

- [Sora 2 API 是什么？](#sora-2-api-是什么)
- [快速开始](#快速开始)
- [API 概览](#api-概览)
- [接口列表](#接口列表)
- [鉴权（Bearer API Key）](#鉴权bearer-api-key)
- [示例](#示例)
- [限制与注意事项](#限制与注意事项)
- [FAQ](#faq)

## Sora 2 API 是什么？

**Sora 2 API** 是一个**异步**的视频生成 API：先创建生成任务，拿到 **task id**，再通过任务查询接口轮询状态，直到 `completed` 并获取结果链接。

官方文档要点：

- 异步任务：create → query task。
- 生成的视频链接有效期 **24 小时**，请尽快保存/下载。

## 快速开始

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## API 概览

- **Base URL**：`https://api.evolink.ai`
- **Model**：`sora-2`
- **鉴权**：`Authorization: Bearer YOUR_API_KEY`

仓库内容：

- `packages/sora-two-api`：TypeScript SDK（基于 `fetch`、带类型）
- `packages/examples`：Next.js + Tailwind 前端展示页（Hero、导航、CTA、外链）

## 接口列表

| 用途                 | 方法 | 路径                     |
| -------------------- | ---: | ------------------------ |
| 创建 Sora 2 生成任务 | POST | `/v1/videos/generations` |
| 查询任务状态 / 结果  |  GET | `/v1/tasks/{task_id}`    |

## 鉴权（Bearer API Key）

1. 在控制台获取 API Key：https://evolink.ai/dashboard/keys
2. 每次请求带上：

```http
Authorization: Bearer YOUR_API_KEY
```

## 示例

### 1) cURL：创建 Sora 2 生成任务（文生视频）

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

### 2) cURL：查询任务状态

```bash
curl "https://api.evolink.ai/v1/tasks/TASK_ID" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### 3) TypeScript SDK（本仓库）

```ts
import { createSoraTwoClient } from 'sora-two-api';

const client = createSoraTwoClient({
  baseUrl: 'https://api.evolink.ai',
  apiKey: process.env.SORA_TWO_API_KEY!,
});

const task = await client.createVideo({
  prompt: 'A cat playing piano',
  aspect_ratio: '16:9',
  duration: 10,
  remove_watermark: true,
});

const detail = await client.getTask(task.id);
console.log(detail.status, detail.progress, detail.results);
```

### 常见参数（Sora 2）

- `prompt`：视频描述（文档里提示最多约 5000）
- `aspect_ratio`：`16:9` 或 `9:16`
- `image_urls`：图片 URL 数组（最多 1 张，用于图生视频）
- `duration`：文档中提到常用为 `10` 或 `15` 秒
- `remove_watermark`：`true` 去水印（更高价格），`false` 保留水印
- `callback_url`：HTTPS 回调地址（任务完成/失败/取消触发）

## 限制与注意事项

根据官方文档：

- 内容审核可能很严格，任务可能失败。
- 图生视频暂不支持包含真实人像的输入图。
- `callback_url` 必须为 HTTPS，且禁止回调到内网/私网 IP。

## FAQ

### Sora 2 API 是同步的吗？

不是。它是异步任务：创建任务拿到 `task_id`，再查询 `/v1/tasks/{task_id}` 直到 `completed`。

### 结果链接有效期多久？

官方文档说明结果链接有效期为 **24 小时**，建议完成后立刻下载/保存。

### 官方文档在哪里？

- https://evolink.ai/sora-2
- https://evolink.ai/api-reference/sora-2/sora-2-API-Reference.md

## License

MIT
