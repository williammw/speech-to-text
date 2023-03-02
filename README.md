# Speech-to-Text Using OpenAI

This is the technical documentation for the Speech-to-Text web app, which allows users to upload an MP3 audio file and receive a transcription of the audio as text.

## Technologies Used

The following technologies were used to build this web app:

- Python (programming language)
- Flask (web framework)
- OpenAI API (for speech transcription)
- HTML, CSS, and JavaScript (for the front-end)

## Requirements

Before running the app, make sure you have the following installed:

- Python 3.x
- Flask (`pip install Flask`)
- openai (`pip install openai`)
- pydub (`pip install pydub`)

Also, you will need to set up an account on the OpenAI platform to obtain an API key. 

## Installation and Setup

1. Clone the repository onto your local machine.

2. Set up a virtual environment for the app using the following command: 

    ```
    python -m venv venv
    ```

3. Activate the virtual environment using the following command:

    ```
    source venv/bin/activate
    ```

4. Install the required Python packages using the following command:

    ```
    pip install -r requirements.txt
    ```

5. Export your OpenAI API key as an environment variable with the following command:

    ```
    export OPENAI_API_KEY=<your-api-key>
    ```

6. Start the Flask server by running the following command:

    ```
    python app.py
    ```
7. Open a web browser and navigate to `http://localhost:5000` to use the app.

## File Structure

The file structure for the app is as follows:

.
├── app.py
├── requirements.txt
├── static
│ ├── css
│ │ └── styles.css
│ └── js
│ └── scripts.js
└── templates
└── index.html

## Example result song from collar (off/on)
```
我才不會厲害 Are you scared? But I don't care 樣氣只寫作 模特兒 我要轉角站 岸裡的小雞就像太空巨大 妳 tão êtes fat 太多真真 太多假真真 你乜都會問 等一等我分分身 Aye 只想拉近 只想血化這族群 即刻揮開滿軍 點點燈 先至震撼 Wanna be hit it I don't need a reason 人等著 交通燈 開機通通燕雲 Ah 只想聲音不延文 Just wait Ah 跳製跳脫興奮 全世界別要灰暗 聲覺只想開燈 不想鐵膩 只想沸騰 不想過敏 推爆波瓦 鬆開繃緊 不准怨恨 不准破陷 Shut down Na na na na na 玩得最燦爛 局促再轉換 Shut down Na na na na na 識機無困難 只需要開關 Mini mini mini mini me Is all I got a All I got a be bruh We just wanna rock it up Do what I wanna do What's up 一種新音 不需醫生要養份 點起烈音 4 3 2 1 爆上門 兩個空分 瘋狂跟蹤玩 不眠不熱 放重生 看完 睜眼一瞬 Um 只想聲音不要亂 Just wait Ah 跳製跳脫興奮 全世界別要灰暗 Sing a song 只想開燈 不想節能 只想沸騰 不想過敏 推爆波瓦 鬆開繃緊 不准怨恨 不准破陷 Shut down Na na na na na 玩得最燦爛 局促再轉換 Shut down Na na na na na 色機無困難 只需要hold Shut down Shut shut shut shut down Shut shut shut shut 這刻我要放假 Just wait Ah 跳製跳脫興奮 Na Now we just dive in Shut down Na na na na na Shut shut shut shut down Shut shut shut shut down Shut shut shut shut down Shut down
```


- `app.py`: the main Python file that runs the Flask app and handles the back-end logic
- `requirements.txt`: a list of required Python packages
- `static`: a directory containing static files (CSS and JavaScript)
- `templates`: a directory containing HTML templates for the app

## Flask Endpoints

The app has the following Flask endpoints:

- `/`: serves the index.html file
- `/transcribe`: handles file upload and transcription
- `/download/<path:filename>`: downloads a transcription file

## How it Works

1. User uploads an MP3 file on the app.
2. The app checks if the file is an MP3 file.
3. If the file is an MP3 file, the app converts it to MP3 format and transcribes the audio using the OpenAI API.
4. The transcription is saved as a text file.
5. The app displays a link to download the transcription file.