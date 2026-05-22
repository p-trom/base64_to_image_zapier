# Base64 to Image URL API

This project converts ChatGPT base64 PNG output into a public image URL using Vercel Blob.

## Stack

- Next.js
- Vercel Blob
- Vercel API Route
- Zapier Webhooks

## API Endpoint

POST `/api/base64-to-image-url`

### Request

```json
{
  "image_base64": "BASE64_STRING",
  "filename": "linkedin-image.png"
}
```

### Response

```json
{
  "success": true,
  "image_url": "https://...",
  "download_url": "https://...",
  "pathname": "...png"
}
```

## Deploy

1. Import repo into Vercel
2. Create Vercel Blob storage
3. Connect Blob store to project
4. Deploy

## Zapier

Use `Webhooks by Zapier -> POST`

Payload:

```json
{
  "image_base64": "{{chatgpt_base64}}",
  "filename": "linkedin-image.png"
}
```
