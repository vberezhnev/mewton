import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Update()
export class BotController {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Start()
  async startCommand(ctx: Context) {
    const payload = encodeURIComponent(JSON.stringify(ctx.message));
    const language = ctx.message.from.language_code;

    const webAppUrl = `https://mewton3.vercel.app/?startapp=${payload}`;

    if (language === 'en') {
      await ctx.replyWithPhoto(
        'https://ciudikqidyqvkwwsxhiv.supabase.co/storage/v1/object/sign/test/welcome.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZXN0L3dlbGNvbWUuanBnIiwiaWF0IjoxNzMyMzY3MjQ2LCJleHAiOjE3NjM5MDMyNDZ9.wOlkJaWr88o392AubjvdeFKqhydravLQICzDpccGCwk&t=2024-11-23T13%3A07%3A24.613Z',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Play',
                  web_app: {
                    url: webAppUrl,
                  },
                },
              ],
            ],
          },
        },
      );
    }

    if (language === 'ru') {
      await ctx.replyWithPhoto(
        'https://ciudikqidyqvkwwsxhiv.supabase.co/storage/v1/object/sign/test/photo_2024-11-23_01-14-34.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZXN0L3Bob3RvXzIwMjQtMTEtMjNfMDEtMTQtMzQuanBnIiwiaWF0IjoxNzMyMzY4NzAyLCJleHAiOjE3NjM5MDQ3MDJ9.rNhIj7aKHkhJD09CdFHk16fCNRYgawcVi8EeipaERcQ&t=2024-11-23T13%3A31%3A40.978Z',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Играть',
                  web_app: {
                    url: webAppUrl,
                  },
                },
              ],
            ],
          },
        },
      );
    }
  }
}
