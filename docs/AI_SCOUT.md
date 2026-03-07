# AI Scout Feature

AI Location Scout adalah fitur chat berbasis AI yang membantu filmmakers menemukan lokasi syuting yang tepat berdasarkan deskripsi scene mereka.

## Technology Stack

- **LangChain**: Framework untuk membangun aplikasi dengan LLM
- **Google Gemini**: Model AI dari Google untuk natural language understanding
- **Next.js API Routes**: Backend API dengan best practices

## Setup

### 1. Install Dependencies

Dependencies sudah terinstall:

```bash
bun add langchain @langchain/google-genai @langchain/core
```

### 2. Environment Variables

Tambahkan Google API Key ke file `.env.local`:

```env
GOOGLE_API_KEY=your-google-api-key-here
```

**Cara mendapatkan API Key:**

1. Kunjungi [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in dengan Google account
3. Klik "Create API Key"
4. Copy key dan paste ke `.env.local`

### 3. Restart Development Server

Setelah menambahkan API key, restart development server:

```bash
bun run dev
```

## File Structure

```
src/
├── app/
│   ├── (main)/
│   │   └── ai-scout/
│   │       └── page.tsx          # Chat UI component
│   └── api/
│       └── ai-scout/
│           └── route.ts          # LangChain API endpoint
```

## Features

### Chat Interface

- ✅ Real-time chat dengan AI
- ✅ Conversation history support
- ✅ Loading states & error handling
- ✅ Auto-scroll ke message terbaru
- ✅ Enter to send, Shift+Enter for new line
- ✅ Responsive design

### AI Capabilities

- Memahami deskripsi scene dari script
- Menganalisis kebutuhan lokasi (interior/exterior, mood, waktu)
- Memberikan rekomendasi lokasi yang sesuai
- Bertanya untuk klarifikasi lebih lanjut

## API Endpoint

### POST `/api/ai-scout`

**Request Body:**

```json
{
  "message": "INT. MANSION - NIGHT - Seorang detektif masuk...",
  "conversationHistory": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

**Response:**

```json
{
  "message": "AI response here...",
  "success": true
}
```

## Best Practices Implemented

1. **Type Safety**: Full TypeScript support dengan proper interfaces
2. **Error Handling**: Comprehensive error handling di client & server
3. **Loading States**: User feedback untuk async operations
4. **Conversation Context**: History support untuk better AI responses
5. **Environment Variables**: Secure API key management
6. **Next.js App Router**: Modern routing dengan Server & Client Components
7. **Code Organization**: Separation of concerns (UI vs API logic)

## Usage Example

1. Navigasi ke `/ai-scout`
2. Ketik atau paste deskripsi scene Anda
3. Tekan Enter atau klik tombol Send
4. AI akan menganalisis dan memberikan rekomendasi

**Contoh Prompt:**

```
INT. MANSION - NIGHT
Seorang detektif masuk ke ruangan besar dengan chandelier kristal
yang berkilauan. Suasana mewah tapi sedikit menyeramkan.
```

## Future Enhancements

- [ ] Integration dengan database lokasi
- [ ] AI dapat mencari dan merekomendasikan lokasi spesifik dari database
- [ ] Upload script file (.pdf, .txt)
- [ ] Export rekomendasi ke PDF
- [ ] Multi-language support
- [ ] Voice input untuk script reading
