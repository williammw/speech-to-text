# Transcription Benchmark

This script transcribes an audio file using the OpenAI API and saves the result to a text file. It also measures the execution time of the transcription process.

## Usage

1. Set your OpenAI API key in a `.env` file.

2. Run the script with the following command: `python whisper.py`.

## Parameters

The script takes the following parameters:

- `file_path`: The path of the audio file to transcribe.

- `model`: The OpenAI API model to use for transcription. The default value is "whisper-1".

## Example result song from collar (off/on)
```我才不會厲害 Are you scared? But I don't care 樣氣只寫作 模特兒 我要轉角站 岸裡的小雞就像太空巨大 妳 tão êtes fat 太多真真 太多假真真 你乜都會問 等一等我分分身 Aye 只想拉近 只想血化這族群 即刻揮開滿軍 點點燈 先至震撼 Wanna be hit it I don't need a reason 人等著 交通燈 開機通通燕雲 Ah 只想聲音不延文 Just wait Ah 跳製跳脫興奮 全世界別要灰暗 聲覺只想開燈 不想鐵膩 只想沸騰 不想過敏 推爆波瓦 鬆開繃緊 不准怨恨 不准破陷 Shut down Na na na na na 玩得最燦爛 局促再轉換 Shut down Na na na na na 識機無困難 只需要開關 Mini mini mini mini me Is all I got a All I got a be bruh We just wanna rock it up Do what I wanna do What's up 一種新音 不需醫生要養份 點起烈音 4 3 2 1 爆上門 兩個空分 瘋狂跟蹤玩 不眠不熱 放重生 看完 睜眼一瞬 Um 只想聲音不要亂 Just wait Ah 跳製跳脫興奮 全世界別要灰暗 Sing a song 只想開燈 不想節能 只想沸騰 不想過敏 推爆波瓦 鬆開繃緊 不准怨恨 不准破陷 Shut down Na na na na na 玩得最燦爛 局促再轉換 Shut down Na na na na na 色機無困難 只需要hold Shut down Shut shut shut shut down Shut shut shut shut 這刻我要放假 Just wait Ah 跳製跳脫興奮 Na Now we just dive in Shut down Na na na na na Shut shut shut shut down Shut shut shut shut down Shut shut shut shut down Shut down
```



## Output

The script saves the transcription result to a text file named `transcription.txt` and prints the transcription and execution time to the console.

## Dependencies

- `openai`: The OpenAI API client library.

- `python-dotenv`: A library for loading environment variables from a `.env` file.
