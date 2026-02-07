import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

interface AiChatBotState {
  loading: boolean;
  error: string | null;
  messages: {
    role: "user" | "assistant";
    message: string;
  }[];
}

const initialState: AiChatBotState = {
  loading: false,
  error: null,
  messages: [],
};

export const chatBot = createAsyncThunk<
  { message: string; status: boolean },
  { prompt: any; productId: number | null | undefined; userId: number | null }
>(
  "aiChatBot/generateResponse",
  async ({ prompt, productId, userId }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/ai/chat",
        prompt,
        { params: { userId, productId } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate chatbot response"
      );
    }
  }
);

const aiChatBotSlice = createSlice({
  name: "aiChatBot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(chatBot.pending, (state, action) => {
        state.loading = true;
        state.error = null;

        // ✅ USER MESSAGE
        state.messages.push({
          role: "user",
          message: action.meta.arg.prompt.prompt,
        });
      })

      .addCase(chatBot.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ AI RESPONSE
        state.messages.push({
          role: "assistant",
          message: action.payload.message,
        });
      })

      .addCase(chatBot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default aiChatBotSlice.reducer;
