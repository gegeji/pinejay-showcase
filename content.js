// All copy and chat scripts, one block per language. Everything here is fictional.
// Source of truth for wording: Paper file "Pinejay Showcase Site", page 「文案 · 四语对照」.
const NANOCLAW = 'https://github.com/qwibitai/nanoclaw';

window.CONTENT = {
  en: {
    htmlLang: 'en',
    ui: {
      tagline: "A personal assistant, used mostly through Telegram",
      fictional: 'All data on this site is fictional.',
      nav: {"home": "Home", "chronicle": "Journal", "review": "Review", "widgets": "Interactive diagrams", "course": "Course", "weather": "Weather", "built": "How it's built"},
      replay: 'Replay',
      pause: 'Pause',
      play: 'Play',
      step: (n, t) => `Step ${n} of ${t}`,
      close: 'Close',
    },
    home: {
      "title": "A personal assistant built around me",
      "body": [
        "Pinejay is a personal assistant I built. I mostly chat with it in Telegram: I jot down what happened today, ask it questions and have it remind me of things.",
        "I tell it about my day and it keeps a journal it can search months later. In the evening it lists what I said I would do but haven’t. In the morning it tells me what to watch for in today’s weather."
      ],
      "aside": "It isn’t another coding agent, and it doesn’t reimplement an agent’s core. Low-level work such as context caching and context handling changes fast, and each framework has its own ecosystem; one person can hardly keep up. So Pinejay uses the mature Claude and Codex SDKs and builds an abstract interface on top of them. I spend most of my time on the assistant features I want.",
      "chat": {
        "avatar": "P",
        "name": "Pinejay",
        "sub": "Thursday"
      },
      "by": {
        "journal": "Journal",
        "review": "Review",
        "weather": "Weather"
      },
      "keys": [
        "Remind me",
        "No thanks"
      ],
      "keyReplies": [
        "OK, I’ll remind you at the end of March.",
        "OK, no reminder."
      ],
      "script": [
        {
          "from": "me",
          "time": "12:40",
          "text": [
            "Back in Seabright today. Grilled fish by the pier. I want to come again when the cherry blossoms are out."
          ]
        },
        {
          "from": "bot",
          "by": "journal",
          "time": "12:41",
          "text": [
            "Noted. Your last visit was Sep 27, and you said the same then. Remind you to book the ferry at the end of March?"
          ],
          "keyboard": "remind"
        },
        {
          "from": "bot",
          "by": "review",
          "time": "21:00",
          "text": [
            "On Monday you said you’d send section 3 to your advisor. It hasn’t gone out yet. Remind you at 9 tomorrow?"
          ]
        },
        {
          "from": "me",
          "time": "21:02",
          "text": [
            "Make it 10, I have a group meeting."
          ]
        },
        {
          "from": "bot",
          "by": "review",
          "time": "21:02",
          "text": [
            "OK, I’ll remind you at 10 tomorrow to send section 3."
          ]
        },
        {
          "from": "bot",
          "by": "weather",
          "time": "Next day 07:00",
          "text": [
            "6° colder than yesterday, wear a jacket."
          ]
        }
      ],
      "timeline": [
        [
          0,
          "12:40",
          "Jot it down"
        ],
        [
          1,
          "12:41",
          "It recalls the last visit"
        ],
        [
          2,
          "21:00",
          "Evening review"
        ],
        [
          5,
          "07:00",
          "Morning weather"
        ]
      ],
      "featuresTitle": "Five things it does",
      "demo": "Demo",
      "features": [
        [
          "chronicle",
          "Journal",
          "Whatever you mention in chat goes into the journal. When it tidies up, it links places, plans and trips by date."
        ],
        [
          "review",
          "Review",
          "Every evening it rereads all of the day’s chats and tells you what you said you’d do but haven’t."
        ],
        [
          "widgets",
          "Interactive diagrams",
          "When a question is easier to explain with a picture, it draws an interactive diagram right in the answer."
        ],
        [
          "course",
          "Course",
          "It builds a course from material you provide and adjusts the pace and difficulty as you learn."
        ],
        [
          "weather",
          "Weather",
          "A morning report each day on the weather worth watching: a cold snap, rain or bad air."
        ]
      ],
      "howTitle": "How it works",
      "how": [
        [
          "Pinejay is built on the open-source project ",
          {
            "text": "NanoClaw",
            "href": "https://github.com/qwibitai/nanoclaw"
          },
          " and runs on my own server."
        ],
        "I talk to Pinejay mostly in a Telegram group. Each topic in the group is handled by its own AI assistant, and each assistant runs in its own sealed-off space (Docker or Apple Container). The keys for Claude and Codex stay on the server; assistants reach them through a bridge the host provides.",
        "Why not let it run on the whole computer? The assistants run commands and edit files on their own, with wide access. In a sealed-off space, an assistant that makes a mistake, or is misled by malicious text on a web page, can at most break its own space, and the other assistants are unaffected. The cost is that they can’t freely use the computer’s apps and files; the host opens up each thing they need, one at a time."
      ],
      "diagram": {
        "you": [
          "",
          "You",
          "Telegram, WeChat, web"
        ],
        "host": [
          "Always on, on a server",
          "Host",
          "Passes messages on, keeps the records, publishes diagrams as web pages"
        ],
        "records": [
          "Kept by the host",
          "Records",
          "Journal, course plans, reminders, in a database"
        ],
        "model": [
          "Claude or Codex",
          "Model",
          "Understands what you say, writes the reply"
        ],
        "group": "Each assistant works in its own sealed-off space",
        "agents": [
          "Course assistant",
          "Weather assistant",
          "Journal assistant"
        ],
        "agentDesc": "Only its own files and notes",
        "arrows": {
          "message": "Send a message",
          "toAgent": "To that topic’s assistant",
          "asks": "Calls the model",
          "reply": "Reply, sometimes with a diagram",
          "keeps": "Save"
        }
      }
    },
    course: {
      title: 'A course made to fit you',
      body: [
        'You tell the agent what you want to learn and why. It drafts a course plan for your goal and level, and starts after you approve the plan.',
        'Each lesson has four buttons under it: next lesson, explain differently, give an example, practice. You can also ask your own question. The agent answers it, notes it on the plan, and goes back to the lesson.',
      ],
      chat: { avatar: 'F', name: 'Reading a forecast', sub: 'Lesson 3, chance of rain' },
      keys: { next: 'Got it, next', differently: 'Explain differently', example: 'Give an example', practice: 'Practice' },
      script: [
        { from: 'bot', time: '07:42', title: 'Lesson 3: Chance of rain', text: ['40% does not mean 40% of the area or of the day. On days like this one, about 4 in 10 bring rain to this spot.'], keyboard: 'lesson' },
        { from: 'me', time: '07:44', text: ['Cycling by the river tomorrow, 3 to 6 pm. The forecast says 40%. Rain jacket?'], side: true },
        { from: 'bot', time: '07:44', text: ['That 40% is for the whole day. During your ride it is 10 to 25%; the rain comes after 8 pm. A thin jacket is enough.'], chart: 'ride', after: ['Back to lesson 3.'] },
      ],
      branches: {
        next: { from: 'bot', time: '07:46', title: 'Lesson 4: Cold fronts', text: ['A cold front is the edge of a mass of cold air. When it passes, the rain usually comes first and the cold follows. The next lesson explains why.'], advance: true },
        nextEnd: { from: 'bot', time: '07:47', text: ['That is the end of this demo course. Press Replay to start again.'] },
        differently: { from: 'bot', time: '07:45', text: ["Take 100 past days whose forecast looked like tomorrow's. It rained here on about 40 of them. Tomorrow is one more day like those."] },
        example: { from: 'bot', time: '07:45', text: ['Two towns both get 40%. In one, a single storm passes at 5 pm. In the other, light drizzle comes and goes all day. The number is the same; the afternoons are very different.'] },
        practice: { from: 'bot', time: '07:45', title: 'Practice', text: ['The forecast says 70% for the day, but 5% between 9 and 11 am. You have a picnic from 9 to 11. What do you do?'], keyboard: 'practice' },
      },
      practice: {
        options: ['Cancel it', 'Go, watch the sky', 'Bring a big umbrella'],
        correct: 1,
        right: 'Right. The 70% applies to another part of the day. Your two hours are almost dry.',
        wrong: 'The daily 70% is misleading here. From 9 to 11 it is only 5%, so the picnic is fine.',
      },
      chart: { title: 'Chance of rain tomorrow, by hour', left: '1 pm', mid: 'your ride, 3–6 pm', right: '8 pm' },
      map: {
        label: 'Course plan',
        lessons: ['Where clouds come from', 'Pressure and wind', 'Chance of rain', 'Cold fronts', 'Reading a typhoon track', 'A full forecast, start to end'],
        done: 'Done',
        now: 'Now',
        side: 'Side question about the 40% forecast, answered during this lesson.',
      },
    },
    weather: {
      "title": "Only what’s worth knowing about today’s weather",
      "body": [
        "Every morning it sends one card for the places you follow. For each place it writes at most two things to watch for today: a cold snap, heat, rain, bad air, strong sun, wind or fog. A quiet place gets only its icons and temperatures.",
        "During the day it writes again only when rain is coming that the morning card didn’t mention, or when an official warning for your place is issued, raised or lifted."
      ],
      "chat": {
        "avatar": "W",
        "name": "Weather",
        "sub": "Every morning at 7"
      },
      "card": {
        "date": "11/21",
        "hours": "Day 8:00 to 18:00　Night 18:00 to 8:00 next day",
        "places": [
          {
            "name": "Northbank",
            "line": "6° colder than yesterday, wear a jacket this morning",
            "detail": "High 14° today, 20° yesterday",
            "day": [
              "Day cloudy",
              "9~14°"
            ],
            "night": [
              "Night cloudy",
              "6~9°"
            ]
          },
          {
            "name": "East Lake",
            "line": "Rain likely 14:00 to 20:00, take an umbrella",
            "detail": "About 12 mm more today, chance up to 80%",
            "day": [
              "Day rain",
              "11~15°"
            ],
            "night": [
              "Night rain",
              "9~11°"
            ]
          },
          {
            "name": "South Port",
            "air": "Good, today up to AQI 31",
            "day": [
              "Day sunny",
              "13~19°"
            ],
            "night": [
              "Night clear",
              "10~13°"
            ]
          }
        ]
      },
      "script": [
        {
          "from": "bot",
          "time": "07:00",
          "card": true,
          "text": [
            [
              {
                "b": "Northbank"
              },
              ": 6° colder than yesterday, wear a jacket this morning"
            ],
            [
              {
                "b": "East Lake"
              },
              ": Rain likely 14:00 to 20:00, take an umbrella"
            ]
          ]
        },
        {
          "from": "bot",
          "time": "13:52",
          "text": [
            [
              {
                "b": "Riverside"
              },
              ": rain forecast 16:00 to 18:00"
            ],
            "About 6 mm in this period, chance up to 70%."
          ]
        }
      ],
      "rules": {
        "label": "When it sends a message",
        "rows": [
          [
            "07:00",
            "Morning card",
            "Once a day. At most two things to watch for at each place. It reads your recent messages in the topic and skips what it already told you."
          ],
          [
            "13:52",
            "Rain reminder",
            "Rain soon that the morning card didn’t mention: at least 2 mm in an hour and 60% likely. Silent from 23:00 until the next card."
          ],
          [
            "—",
            "Official warning",
            "When a warning for your place is issued, raised or lifted. Each change is sent once."
          ]
        ]
      }
    },
    chronicle: {
      title: 'Moments you would otherwise forget',
      body: [
        'Chronicle stores what you mention in chat as a knowledge graph: people, places, events, and the statements that link them. We designed its structure by hand.',
        'Months later you can ask about a person, a place or a week. The answer is built from the stored statements, and each statement links to the sentence it came from.',
      ],
      steps: { said: (d) => `Said in chat, ${d}`, statements: (n) => `${n} statement${n === 1 ? '' : 's'}`, timeline: 'On the timeline', asked: 'Asked months later' },
      hint: 'Tap a statement to see which words it came from. Tap an event to open it.',
      kinds: { event: 'Event', view: 'View', plan: 'Plan' },
      planLabel: 'Plan',
      events: [
        { date: '09-14', said: 'Sep 14', title: 'Planning a Seabright weekend', plan: true,
          original: [{ t: 'Thinking of ' }, { t: 'a weekend in Seabright, two nights near the lighthouse', s: 0 }, { t: '. ' }, { t: 'Ferry tickets go on sale Monday', s: 1 }, { t: '.' }],
          statements: [{ kind: 'plan', text: 'A weekend in Seabright, two nights near the lighthouse.' }, { kind: 'event', text: 'Ferry tickets to Seabright go on sale on Monday.' }] },
        { date: '09-27', said: 'Sep 27', title: 'Seabright, day one',
          original: [{ t: 'Took ' }, { t: 'the 8:10 ferry to Seabright', s: 0 }, { t: '. Found ' }, { t: 'a tiny noodle shop in the old town, Harbour Lane Noodles', s: 1 }, { t: ', ' }, { t: 'best fish soup in years', s: 2 }, { t: '. Walked up to ' }, { t: 'the lighthouse at sunset', s: 3 }, { t: '.' }],
          statements: [{ kind: 'event', text: 'You took the 8:10 ferry to Seabright.' }, { kind: 'event', text: 'You found Harbour Lane Noodles in the old town.' }, { kind: 'view', text: 'You thought its fish soup was the best in years.' }, { kind: 'event', text: 'You walked to the lighthouse at sunset.' }] },
        { date: '09-28', said: 'Sep 28', title: 'Seabright, day two',
          original: [{ t: 'Rained all morning, so ' }, { t: 'we stayed in the bookshop by the pier', s: 0 }, { t: '. ' }, { t: 'Bought a tide table for the bay', s: 1 }, { t: '.' }],
          statements: [{ kind: 'event', text: 'Rain kept you in the bookshop by the pier all morning.' }, { kind: 'event', text: 'You bought a tide table for the bay.' }] },
        { date: '04-05', said: 'Oct 2', title: 'Back for the cherry blossom', plan: true,
          original: [{ t: 'Want to ' }, { t: 'go back to Seabright in early April', s: 0 }, { t: ', when ' }, { t: 'the cherry trees by the lighthouse bloom', s: 1 }, { t: '.' }],
          statements: [{ kind: 'plan', text: 'Go back to Seabright in early April.' }, { kind: 'view', text: 'The cherry trees by the lighthouse bloom in early April.' }] },
      ],
      defaultEvent: 1,
      qa: {
        q: 'What was that noodle place in Seabright with the great fish soup?',
        a: 'Harbour Lane Noodles, in the old town. You found it on Sep 27, the first day of the trip, and said its fish soup was the best in years.',
        link: 'Show the original',
        event: 1,
        statement: 1,
      },
    },
    review: {
      title: 'What no single conversation shows',
      body: [
        'Every evening it reads the past seven days of conversations from all my tools, plus Chronicle and the feed. It watches for three kinds of problems: issues that keep coming back, work that was started but not finished, and decisions that contradict each other.',
        'Each point comes with its source and a few buttons, such as “Remind me in March” or “Dropped it”. Once you mark something as dropped, later reviews stop bringing it up.',
      ],
      chat: { avatar: 'R', name: 'Review', sub: 'Every evening at 9' },
      script: [
        { from: 'bot', time: '21:00', title: 'Unfinished', text: ['You planned to go back to Seabright in early April. The ferry booking you mentioned has not come up since.'], quotes: [['“Want to go back to Seabright in early April.”', 'Oct 2, journal']], keyboard: 'f1' },
        { from: 'bot', time: '21:00', title: 'Conflicting decisions', text: ['On Monday you asked the course to slow down. On Thursday you asked it for two lessons a day.'], quotes: [['“Let’s take it slower this week.”', 'Mon, course'], ['“Can we do two lessons a day?”', 'Thu, course']], keyboard: 'f2' },
      ],
      keys: { f1: [['remind', 'Remind me in March'], ['drop', 'Dropped it']], f2: [['slow', 'Keep it slow'], ['two', 'Two a day']] },
      replies: {
        remind: 'I’ll remind you on March 1 to book the ferry.',
        drop: 'Removed from your plans. It won’t come up again.',
        slow: 'The course stays at one lesson a day.',
        two: 'From tomorrow the course sends two lessons a day.',
      },
      side: {
        label: 'What it reads',
        rows: [
          ['7 days', 'Conversations', 'From every tool: Telegram, the terminal, coding agents.'],
          ['7 days', 'Chronicle and the feed', 'What happened, what you planned, what you read.'],
          ['Sunday', 'Weekly look back', 'The same week last year, and opinions that have changed since.'],
        ],
        checkLabel: 'Quote check',
        checkText: 'Every quote is compared with the source it names. A quote that cannot be traced to its source is not sent.',
      },
    },
    widgets: {
      title: 'Draws while it answers',
      body: [
        'When a question is about a shape, a trend or a route, the agent draws a diagram, sends it as an image in the reply, and then explains it.',
        'Tapping the image opens an interactive version that works on a phone.',
      ],
      chat: { avatar: 'F', name: 'Reading a forecast', sub: 'Lesson 4, cold fronts' },
      script: [
        { from: 'me', time: '20:31', text: ['Why does it rain first and only turn cold afterwards when a cold front comes through?'] },
        { from: 'bot', time: '20:31', widget: true, text: ['Cold air is heavy, so it slides in underneath like a wedge. The warm, damp air in front is pushed up and cools, and that forms the cloud on the right. The rain comes from that cloud.', 'You feel the cold only when the wedge itself reaches you, a few hours after the rain starts.'] },
      ],
      widget: {
        title: 'A cold front, side view',
        cold: 'cold air pushes in',
        warm: 'warm air lifted',
        open: 'Open the interactive version',
        slider: 'Hours from now',
        you: 'You are here',
        states: ['Warm and cloudy. Rain is on the way.', 'Raining. The warm air that was pushed up is right above you.', 'Cold and clearing. The cold air has reached you.'],
      },
      steps: {
        label: 'How a widget is made',
        rows: [
          ['Propose', 'The agent decides a diagram would help and suggests a few visual styles.'],
          ['Pick', 'The host picks one of those styles at random, so widgets do not all look alike.'],
          ['Review', 'A separate reviewer model checks a screenshot of the draft for wrong facts and unclear wording.'],
          ['Send', 'Only widgets that pass are sent: an image in the chat and a link to the interactive page.'],
        ],
      },
    },
    built: {
      title: 'Built and kept running by agents',
      body: [
        'I decide what to build and in what order. Claude Code and Codex agents do the design, the code, the review and the deploy.',
        'Every change is a work item with written acceptance criteria. The agent that wrote the code does not approve it; a different agent checks each criterion in a clean checkout.',
      ],
      label: 'Example: one work item',
      demo: {
        id: 'DEV-4f2a91c0',
        title: 'Weather alert reads my calendar',
        quoteLabel: 'Authorised by: ',
        quote: '“The rain alert should know when I’m out on the bike.”',
        acceptLabel: 'Acceptance criteria',
        stages: ['Ask', 'Register', 'Design', 'Implement', 'Verify', 'Ship', 'Watch'],
        conditions: ['Rain above 60% within three hours of a ride sends one alert.', 'An all-day calendar entry does not count as being outdoors.', 'A dry day sends nothing.'],
        states: { open: 'Open', met: 'Met', failed: 'Failed' },
        who: { me: 'me', cc: 'Claude Code', cx: 'Codex', sys: 'the system' },
        statuses: ['Asked', 'Registered', 'Design picked', 'Submitted', 'Back to the author', 'Fixed', 'Verified', 'Live', 'Watching'],
        logs: ['Asked in Telegram.', 'Registered with three acceptance criteria.', 'Picked version B of the alert in Paper.', 'Submitted 8c1e0d2 with tests.', 'Criterion 2 failed in a clean checkout. Sent back.', 'All-day entries skipped. Submitted 3b7f5a1.', 'All three criteria met in a clean checkout.', 'Merged and deployed 3b7f5a1. Service checked.', 'Next day: one alert, sent before the ride.'],
      },
    },
  },

  'zh-CN': {
    htmlLang: 'zh-CN',
    ui: {
      tagline: "Telegram 里的私人助手",
      fictional: '本站数据均为虚构。',
      nav: {"home": "首页", "chronicle": "日记", "review": "回顾", "widgets": "交互式说明图", "course": "课程", "weather": "天气", "built": "开发方式"},
      replay: '从头播放',
      pause: '暂停',
      play: '继续',
      step: (n, t) => `第 ${n} 步，共 ${t} 步`,
      close: '关闭',
    },
    home: {
      "title": "高度定制化的私人助手",
      "body": [
        "Pinejay 是我自己做的私人助手。我主要在 Telegram 里和它聊天：随手记一笔当天的事，问它问题，让它提醒我。",
        "我把每天的事随手告诉它，它记进日记，几个月后还能帮我找回来。晚上它列出我这一天说了但还没做的事。早上它告诉我今天的天气要注意什么。"
      ],
      "aside": "它不是又一个编程智能体，也不自己重写智能体的内核。上下文缓存、上下文操作这类底层实现变化很快，每个框架有各自的生态，一个人很难持续跟进。所以 Pinejay 使用成熟的 Claude SDK 和 Codex SDK，在它们之上实现一层抽象接口。我把时间主要花在我想要的私人助手功能上。",
      "chat": {
        "avatar": "P",
        "name": "Pinejay",
        "sub": "星期四"
      },
      "by": {
        "journal": "日记",
        "review": "回顾",
        "weather": "天气"
      },
      "keys": [
        "好，提醒我",
        "不用"
      ],
      "keyReplies": [
        "好，三月底提醒你订船票。",
        "好，不提醒了。"
      ],
      "script": [
        {
          "from": "me",
          "time": "12:40",
          "text": [
            "今天又去了海明镇，在码头边吃了烤鱼。想四月樱花开的时候再来一次。"
          ]
        },
        {
          "from": "bot",
          "by": "journal",
          "time": "12:41",
          "text": [
            "记下了。你上次来海明镇是 9 月 27 日，那次也说过想再来。三月底提醒你订船票？"
          ],
          "keyboard": "remind"
        },
        {
          "from": "bot",
          "by": "review",
          "time": "21:00",
          "text": [
            "你周一说要把论文第 3 节发给导师，到今天还没发。明早 9 点提醒你？"
          ]
        },
        {
          "from": "me",
          "time": "21:02",
          "text": [
            "改到 10 点吧，早上有组会。"
          ]
        },
        {
          "from": "bot",
          "by": "review",
          "time": "21:02",
          "text": [
            "好，明早 10 点提醒你发第 3 节。"
          ]
        },
        {
          "from": "bot",
          "by": "weather",
          "time": "第二天 07:00",
          "text": [
            "比昨天冷 6°，出门加件外套。"
          ]
        }
      ],
      "timeline": [
        [
          0,
          "12:40",
          "记一笔"
        ],
        [
          1,
          "12:41",
          "它接上旧事"
        ],
        [
          2,
          "21:00",
          "晚上回顾"
        ],
        [
          5,
          "07:00",
          "早上天气"
        ]
      ],
      "featuresTitle": "五件它能做的“特别”的事",
      "demo": "演示",
      "features": [
        [
          "chronicle",
          "日记",
          "在聊天里随手说的事，它记进日记，整理的时候把地方、计划和经历按时间连起来。"
        ],
        [
          "review",
          "回顾",
          "每晚它回看一遍当天所有对话，告诉你哪些事说了还没做。"
        ],
        [
          "widgets",
          "交互式说明图",
          "当问题需要图来解释时，它在回答里直接画一张能交互操作的图示辅助讲解。"
        ],
        [
          "course",
          "课程",
          "用自己提供的材料创建定制化的课程，并可以按学习的情况动态调整快慢和难度。"
        ],
        [
          "weather",
          "天气",
          "每天推送一条早报，提醒你今天值得注意的天气情况：降温、下雨或者空气差。"
        ]
      ],
      "howTitle": "技术原理",
      "how": [
        [
          "Pinejay 基于开源项目 ",
          {
            "text": "NanoClaw",
            "href": "https://github.com/qwibitai/nanoclaw"
          },
          " 开发，运行在我自己的服务器上。"
        ],
        "Pinejay 主要通过 Telegram 群进行交互。Telegram 群里每个话题由一个单独的 AI 助手负责，每个助手在自己的隔离环境（Docker 或者 Apple Container）里运行。调用 Claude 和 Codex 的密钥只留在服务器上，通过主机提供的网桥转接访问。",
        "为什么不让它直接在整台电脑上运行？这些助手能够自己执行命令、修改文件，拥有很大的访问权限。放在隔离环境里，一个助手即使出错，或者被网页上的恶意文字误导，它最多弄坏自己的环境，也不会影响其他助手。代价是它们不能随手使用电脑上的软件和文件，需要什么由主机一项项开放。"
      ],
      "diagram": {
        "you": [
          "",
          "你",
          "Telegram、微信、网页"
        ],
        "host": [
          "一直运行在服务器上",
          "主机",
          "传递消息，保存记录，把说明图发布成网页"
        ],
        "records": [
          "由主机保存",
          "记录",
          "日记、课程计划、提醒，存在数据库里"
        ],
        "model": [
          "Claude 或 Codex",
          "模型",
          "理解你的话，写出回复"
        ],
        "group": "每个智能体在自己的隔离环境里工作",
        "agents": [
          "课程智能体",
          "天气智能体",
          "日记智能体"
        ],
        "agentDesc": "只有自己的文件和笔记",
        "arrows": {
          "message": "发消息",
          "toAgent": "交给该话题的智能体",
          "asks": "调用模型",
          "reply": "回复，可带说明图",
          "keeps": "保存"
        }
      }
    },
    course: {
      title: '为你量身定做的课',
      body: [
        '你告诉 agent 想学什么、为什么学。它按你的目标和基础拟一份课程计划，你批准后才开始。',
        '每一讲下面有四个按钮：下一讲、换个讲法、举个例子、练一下。你也可以自己提问，agent 回答后把这个问题记在计划上，再回到这一讲。',
      ],
      chat: { avatar: '天', name: '看懂天气预报', sub: '第 3 讲：降水概率' },
      keys: { next: '懂了，下一讲', differently: '换个讲法', example: '举个例子', practice: '练一下' },
      script: [
        { from: 'bot', time: '07:42', title: '第 3 讲：降水概率', text: ['40% 不是 40% 的地方会下雨，也不是 40% 的时间在下雨。意思是：和今天相似的日子里，大约 10 天有 4 天这里会下雨。'], keyboard: 'lesson' },
        { from: 'me', time: '07:44', text: ['明天下午 3 点到 6 点在江边骑车，预报 40%，带雨衣吗？'], side: true },
        { from: 'bot', time: '07:44', text: ['40% 是全天的数。你骑车那三小时只有 10% 到 25%，雨在晚上 8 点后才来。带件薄雨衣就够了。'], chart: 'ride', after: ['回到第 3 讲。'] },
      ],
      branches: {
        next: { from: 'bot', time: '07:46', title: '第 4 讲：冷锋', text: ['冷锋是一团冷空气的前沿。它经过时，通常先下雨，后降温。下一讲解释原因。'], advance: true },
        nextEnd: { from: 'bot', time: '07:47', text: ['演示课程到这里结束。点「从头播放」可以重新开始。'] },
        differently: { from: 'bot', time: '07:45', text: ['找出过去 100 个预报和明天差不多的日子，其中大约 40 天这里下了雨。明天就是这样的一天。'] },
        example: { from: 'bot', time: '07:45', text: ['两个地方都是 40%。一个是下午 5 点过一场暴雨，另一个是一整天断断续续下毛毛雨。数字相同，下午的情况完全不同。'] },
        practice: { from: 'bot', time: '07:45', title: '练一下', text: ['预报全天 70%，但上午 9 点到 11 点只有 5%。你 9 点到 11 点要野餐，怎么办？'], keyboard: 'practice' },
      },
      practice: {
        options: ['取消', '照去，留意天色', '带把大伞'],
        correct: 1,
        right: '对。70% 落在一天里别的时段，你那两个小时几乎不会下雨。',
        wrong: '全天 70% 在这里会误导你。9 点到 11 点只有 5%，野餐没问题。',
      },
      chart: { title: '明天逐时降水概率', left: '13 时', mid: '骑车 15–18 时', right: '20 时' },
      map: {
        label: '课程计划',
        lessons: ['云从哪里来', '气压与风', '降水概率', '冷锋', '台风路径图', '读一张完整预报'],
        done: '学过',
        now: '正在讲',
        side: '插问：关于 40% 的预报，在这一讲中回答。',
      },
    },
    weather: {
      "title": "只说今天值得知道的天气",
      "body": [
        "每天早上，它为你关注的地点发一张早报。每个地点最多写两件今天要注意的事：降温、高温、下雨、空气差、紫外线强、大风或雾。没什么要注意的地点只留图标和气温。",
        "白天只在两种情况下再发：快下雨了而早报没说过，或者你所在地点的官方预警发布、升级或解除。"
      ],
      "chat": {
        "avatar": "晴",
        "name": "天气",
        "sub": "每天早上 7 点"
      },
      "card": {
        "date": "11/21",
        "hours": "日间 08 至 18 时　夜间 18 至次日 08 时",
        "places": [
          {
            "name": "江北区",
            "line": "比昨天冷 6°，早上出门加件外套",
            "detail": "今天最高 14°，昨天最高 20°",
            "day": [
              "日间 阴",
              "9~14°"
            ],
            "night": [
              "夜间 阴",
              "6~9°"
            ]
          },
          {
            "name": "东湖",
            "line": "14 时至 20 时可能下雨，记得带伞",
            "detail": "今天还有约 12 mm，概率最高 80%",
            "day": [
              "日间 雨",
              "11~15°"
            ],
            "night": [
              "夜间 雨",
              "9~11°"
            ]
          },
          {
            "name": "南港",
            "air": "优，今天最高 AQI 31",
            "day": [
              "日间 晴",
              "13~19°"
            ],
            "night": [
              "夜间 晴",
              "10~13°"
            ]
          }
        ]
      },
      "script": [
        {
          "from": "bot",
          "time": "07:00",
          "card": true,
          "text": [
            [
              {
                "b": "江北区"
              },
              "：比昨天冷 6°，早上出门加件外套"
            ],
            [
              {
                "b": "东湖"
              },
              "：14 时至 20 时可能下雨，记得带伞"
            ]
          ]
        },
        {
          "from": "bot",
          "time": "13:52",
          "text": [
            [
              {
                "b": "江边"
              },
              "：预报 16 时至 18 时可能下雨"
            ],
            "这段时间约 6 mm，概率最高 70%。"
          ]
        }
      ],
      "rules": {
        "label": "什么时候发消息",
        "rows": [
          [
            "07:00",
            "早报",
            "每天一次。每个地点最多写两件要注意的事。它会参考你最近在话题里说的话，说过的不再重复。"
          ],
          [
            "13:52",
            "下雨提醒",
            "早报没说过、马上要来的雨：一小时雨量至少 2 mm，概率至少 60%。23 时到第二天早报前不发。"
          ],
          [
            "—",
            "官方预警",
            "你所在地点的预警发布、升级或解除时发，每次变化只发一次。"
          ]
        ]
      }
    },
    chronicle: {
      title: '找回你可能忘掉的那个瞬间',
      body: [
        '问史库把你在聊天里提到的事存成一张知识图谱：人物、地点、事件，以及把它们连起来的陈述。图谱的结构是我们手工设计的。',
        '几个月后，你可以问某个人、某个地方或某一周。回答由存下的陈述组成，每条陈述都链接到它出自的那句原话。',
      ],
      steps: { said: (d) => `${d}，在聊天里说的`, statements: (n) => `${n} 条陈述`, timeline: '时间线', asked: '几个月后再问' },
      hint: '点一条陈述，看它出自哪几个字。点时间线上的事件可以打开它。',
      kinds: { event: '发生', view: '看法', plan: '计划' },
      planLabel: '计划',
      events: [
        { date: '09-14', said: '9 月 14 日', title: '计划去海明镇过周末', plan: true,
          original: [{ t: '想' }, { t: '找个周末去海明镇，在灯塔附近住两晚', s: 0 }, { t: '。' }, { t: '船票周一开售', s: 1 }, { t: '。' }],
          statements: [{ kind: 'plan', text: '找个周末去海明镇，在灯塔附近住两晚。' }, { kind: 'event', text: '去海明镇的船票周一开售。' }] },
        { date: '09-27', said: '9 月 27 日', title: '海明镇，第一天',
          original: [{ t: '坐' }, { t: '8:10 的船到了海明镇', s: 0 }, { t: '。在老城' }, { t: '找到一家小面馆，叫港巷面馆', s: 1 }, { t: '，' }, { t: '鱼汤是这几年喝过最好的', s: 2 }, { t: '。傍晚' }, { t: '走到灯塔看日落', s: 3 }, { t: '。' }],
          statements: [{ kind: 'event', text: '你坐 8:10 的船到了海明镇。' }, { kind: 'event', text: '你在老城找到港巷面馆。' }, { kind: 'view', text: '你觉得那里的鱼汤是这几年喝过最好的。' }, { kind: 'event', text: '你傍晚走到灯塔看日落。' }] },
        { date: '09-28', said: '9 月 28 日', title: '海明镇，第二天',
          original: [{ t: '上午一直下雨，' }, { t: '就待在码头边的书店', s: 0 }, { t: '。' }, { t: '买了一张海湾的潮汐表', s: 1 }, { t: '。' }],
          statements: [{ kind: 'event', text: '上午下雨，你待在码头边的书店。' }, { kind: 'event', text: '你买了一张海湾的潮汐表。' }] },
        { date: '04-05', said: '10 月 2 日', title: '樱花开时再去', plan: true,
          original: [{ t: '想' }, { t: '四月初再去一次海明镇', s: 0 }, { t: '，那时' }, { t: '灯塔边的樱花正开', s: 1 }, { t: '。' }],
          statements: [{ kind: 'plan', text: '四月初再去一次海明镇。' }, { kind: 'view', text: '灯塔边的樱花四月初开。' }] },
      ],
      defaultEvent: 1,
      qa: { q: '海明镇那家鱼汤很好喝的面馆叫什么？', a: '港巷面馆，在老城。是 9 月 27 日旅行第一天找到的，你说那里的鱼汤是这几年喝过最好的。', link: '查看原句', event: 1, statement: 1 },
    },
    review: {
      title: '单看一次对话看不出来的事',
      body: [
        '每天晚上，它读过去七天里我在各个工具中的对话，以及问史库和订阅源。它会关注三类问题：反复出现的情况、开了头没做完的事、互相矛盾的决定。',
        '每一条都附上原话出处和几个按钮，比如「三月提醒我」「不去了」。标为「不去了」的事，之后的回顾就不会再提。',
      ],
      chat: { avatar: '回', name: '回顾', sub: '每天晚上 9 点' },
      script: [
        { from: 'bot', time: '21:00', title: '没做完', text: ['你打算四月初再去海明镇，但之后再没提过订船票。'], quotes: [['“想四月初再去一次海明镇。”', '10 月 2 日，日记']], keyboard: 'f1' },
        { from: 'bot', time: '21:00', title: '决定互相矛盾', text: ['周一你让课程放慢，周四又要每天上两讲。'], quotes: [['“这周慢一点吧。”', '周一，课程'], ['“能不能一天上两讲？”', '周四，课程']], keyboard: 'f2' },
      ],
      keys: { f1: [['remind', '三月提醒我'], ['drop', '不去了']], f2: [['slow', '保持慢节奏'], ['two', '一天两讲']] },
      replies: { remind: '3 月 1 日提醒你订船票。', drop: '已从计划里去掉，之后不再提。', slow: '课程保持每天一讲。', two: '从明天起，课程每天发两讲。' },
      side: {
        label: '读什么',
        rows: [
          ['7 天', '对话', '来自各个工具：Telegram、终端、编程 agent。'],
          ['7 天', '问史库和订阅源', '发生了什么、计划了什么、读了什么。'],
          ['周日', '每周回看', '去年的同一周，以及之后改变了的看法。'],
        ],
        checkLabel: '引用核对',
        checkText: '每条引用都会和它标注的出处比对，不发送没有出处的引用。',
      },
    },
    widgets: {
      title: '边回答，边画图',
      body: ['问题涉及形状、趋势或路线时，agent 会画一张图，作为图片放进回复，再进行讲解。', '点开图片，是一个能在手机上操作的交互版本。'],
      chat: { avatar: '天', name: '看懂天气预报', sub: '第 4 讲：冷锋' },
      script: [
        { from: 'me', time: '20:31', text: ['冷锋过境的时候，为什么先下雨，过后才降温？'] },
        { from: 'bot', time: '20:31', widget: true, text: ['冷空气重，像楔子一样从下面插进来。前面又暖又湿的空气被抬起、变冷，形成右边那团云，雨就是从这团云里下来的。', '等冷空气楔子本身到了你这里，你才会觉得冷，通常比开始下雨晚几个小时。'] },
      ],
      widget: {
        title: '冷锋过境，侧面看',
        cold: '冷空气插进来',
        warm: '暖空气被抬升',
        open: '打开交互版',
        slider: '从现在起的小时数',
        you: '你在这里',
        states: ['暖，多云。雨正在过来。', '在下雨。被抬起的暖空气就在你头顶。', '变冷，转晴。冷空气到了。'],
      },
      steps: {
        label: 'widget 是怎么做出来的',
        rows: [
          ['提议', 'agent 判断画图有帮助，提出几种视觉风格。'],
          ['抽选', '主机从这几种风格里随机选一种，这样 widget 不会都长一个样。'],
          ['审查', '另一个负责审查的模型看草稿截图，检查事实错误和表述不清的地方。'],
          ['发送', '只有通过审查的 widget 才会发出：聊天里一张图片，加一个交互页面的链接。'],
        ],
      },
    },
    built: {
      title: '由 agent 开发和维护',
      body: ['做什么、先做什么由我决定。设计、写代码、评审和部署由 Claude Code 和 Codex 的 agent 完成。', '每个改动都是一个事项，写明验收条件。写代码的 agent 不能自己验收，由另一个 agent 在干净的检出里逐条核对。'],
      label: '示例：一个事项',
      demo: {
        id: 'DEV-4f2a91c0',
        title: '天气提醒读取我的日程',
        quoteLabel: '授权原话：',
        quote: '“下雨提醒应该知道我什么时候出门骑车。”',
        acceptLabel: '验收条件',
        stages: ['提出', '登记', '设计', '实现', '验收', '上线', '盯运行'],
        conditions: ['骑车前后三小时内降水概率超过 60%，发一条提醒。', '全天日程不算在户外。', '不下雨的日子什么都不发。'],
        states: { open: '待验', met: '通过', failed: '未通过' },
        who: { me: '我', cc: 'Claude Code', cx: 'Codex', sys: '系统' },
        statuses: ['已提出', '已登记', '已选定设计', '已提交', '退回作者', '已修复', '验收通过', '已上线', '运行中'],
        logs: ['在 Telegram 里提出。', '登记，写了三条验收条件。', '在 Paper 里选了提醒的 B 版。', '提交 8c1e0d2，附测试。', '第 2 条在干净检出里没通过，退回。', '跳过全天日程，提交 3b7f5a1。', '三条都在干净检出里通过。', '合入并部署 3b7f5a1，检查了服务。', '第二天：骑车前发了一条提醒。'],
      },
    },
  },

  'zh-HK': {
    htmlLang: 'zh-HK',
    ui: {
      tagline: "Telegram 裡的私人助理",
      fictional: '本網站的資料全屬虛構。',
      nav: {"home": "首頁", "chronicle": "日記", "review": "回顧", "widgets": "互動說明圖", "course": "課程", "weather": "天氣", "built": "開發方式"},
      replay: '從頭播放',
      pause: '暫停',
      play: '繼續',
      step: (n, t) => `第 ${n} 步，共 ${t} 步`,
      close: '關閉',
    },
    home: {
      "title": "度身訂造的私人助理",
      "body": [
        "Pinejay 是我自己做的私人助理。我主要在 Telegram 裡和它聊天：隨手記下當天的事，問它問題，讓它提醒我。",
        "我把每天的事隨手告訴它，它記進日記，幾個月後還能幫我找回來。晚上它列出我這一天說了但還沒做的事。早上它告訴我今天的天氣要注意甚麼。"
      ],
      "aside": "它不是又一個編程智能體，也不自己重寫智能體的核心。上下文快取、上下文操作這類底層實現變化很快，每個框架都有各自的生態，一個人很難持續跟進。所以 Pinejay 使用成熟的 Claude SDK 和 Codex SDK，在它們之上實現一層抽象介面。我把時間主要花在我想要的私人助理功能上。",
      "chat": {
        "avatar": "P",
        "name": "Pinejay",
        "sub": "星期四"
      },
      "by": {
        "journal": "日記",
        "review": "回顧",
        "weather": "天氣"
      },
      "keys": [
        "好，提醒我",
        "不用"
      ],
      "keyReplies": [
        "好，三月底提醒你訂船票。",
        "好，不提醒了。"
      ],
      "script": [
        {
          "from": "me",
          "time": "12:40",
          "text": [
            "今天又去了海明鎮，在碼頭邊吃了烤魚。想四月櫻花開的時候再來一次。"
          ]
        },
        {
          "from": "bot",
          "by": "journal",
          "time": "12:41",
          "text": [
            "記下了。你上次來海明鎮是 9 月 27 日，那次也說過想再來。三月底提醒你訂船票？"
          ],
          "keyboard": "remind"
        },
        {
          "from": "bot",
          "by": "review",
          "time": "21:00",
          "text": [
            "你星期一說要把論文第 3 節發給導師，到今天還沒發。明早 9 時提醒你？"
          ]
        },
        {
          "from": "me",
          "time": "21:02",
          "text": [
            "改到 10 時吧，早上要開組會。"
          ]
        },
        {
          "from": "bot",
          "by": "review",
          "time": "21:02",
          "text": [
            "好，明早 10 時提醒你發第 3 節。"
          ]
        },
        {
          "from": "bot",
          "by": "weather",
          "time": "翌日 07:00",
          "text": [
            "比昨天冷 6°，出門加件外套。"
          ]
        }
      ],
      "timeline": [
        [
          0,
          "12:40",
          "記一筆"
        ],
        [
          1,
          "12:41",
          "它接上舊事"
        ],
        [
          2,
          "21:00",
          "晚上回顧"
        ],
        [
          5,
          "07:00",
          "早上天氣"
        ]
      ],
      "featuresTitle": "五件它能做的「特別」的事",
      "demo": "示範",
      "features": [
        [
          "chronicle",
          "日記",
          "在聊天裡隨手說的事，它記進日記，整理的時候把地方、計劃和經歷按時間串起來。"
        ],
        [
          "review",
          "回顧",
          "每晚它回看一遍當天所有對話，告訴你哪些事說了還沒做。"
        ],
        [
          "widgets",
          "互動說明圖",
          "當問題需要用圖來解釋時，它在回答裡直接畫一張可以互動操作的圖示輔助講解。"
        ],
        [
          "course",
          "課程",
          "用自己提供的材料建立度身訂造的課程，並按學習情況調整快慢和難度。"
        ],
        [
          "weather",
          "天氣",
          "每天推送一則早報，提醒你今天值得注意的天氣：降溫、下雨或空氣差。"
        ]
      ],
      "howTitle": "技術原理",
      "how": [
        [
          "Pinejay 以開源項目 ",
          {
            "text": "NanoClaw",
            "href": "https://github.com/qwibitai/nanoclaw"
          },
          " 為基礎開發，運行在我自己的伺服器上。"
        ],
        "Pinejay 主要透過 Telegram 群組互動。群組裡每個話題由一個獨立的 AI 助理負責，每個助理在自己的隔離環境（Docker 或 Apple Container）裡運行。呼叫 Claude 和 Codex 的金鑰只留在伺服器上，經主機提供的網橋轉接使用。",
        "為甚麼不讓它直接在整部電腦上運行？這些助理能自己執行指令、修改檔案，權限很大。放在隔離環境裡，一個助理即使出錯，或被網頁上的惡意文字誤導，最多弄壞自己的環境，也不會影響其他助理。代價是它們不能隨手使用電腦上的軟件和檔案，需要甚麼由主機逐項開放。"
      ],
      "diagram": {
        "you": [
          "",
          "你",
          "Telegram、微信、網頁"
        ],
        "host": [
          "一直在伺服器上運行",
          "主機",
          "傳遞訊息，保存紀錄，把說明圖發布成網頁"
        ],
        "records": [
          "由主機保存",
          "紀錄",
          "日記、課程計劃、提醒，存在資料庫裡"
        ],
        "model": [
          "Claude 或 Codex",
          "模型",
          "理解你的話，寫出回覆"
        ],
        "group": "每個智能體在自己的隔離環境裡工作",
        "agents": [
          "課程智能體",
          "天氣智能體",
          "日記智能體"
        ],
        "agentDesc": "只有自己的檔案和筆記",
        "arrows": {
          "message": "發訊息",
          "toAgent": "交給該話題的智能體",
          "asks": "呼叫模型",
          "reply": "回覆，可附說明圖",
          "keeps": "保存"
        }
      }
    },
    course: {
      title: '為你度身訂造的課程',
      body: [
        '你告訴 agent 想學甚麼、為何要學。它會按你的目標和程度擬定課程計劃，經你批准後才開始。',
        '每一課下方有四個按鈕：下一課、換個講法、舉個例子、做練習。你也可以自行提問，agent 回答後會把問題記在計劃上，再回到這一課。',
      ],
      chat: { avatar: '天', name: '看懂天氣預報', sub: '第 3 課：降雨概率' },
      keys: { next: '明白了，下一課', differently: '換個講法', example: '舉個例子', practice: '做練習' },
      script: [
        { from: 'bot', time: '07:42', title: '第 3 課：降雨概率', text: ['40% 不是指 40% 的地區會下雨，也不是指 40% 的時間在下雨，而是在與今天相似的日子中，大約每 10 天有 4 天這裏會下雨。'], keyboard: 'lesson' },
        { from: 'me', time: '07:44', text: ['明天下午 3 時至 6 時在海濱踏單車，預報說 40%，需要帶雨衣嗎？'], side: true },
        { from: 'bot', time: '07:44', text: ['40% 是全日的數字。你踏單車那三小時只有 10% 至 25%，雨要到晚上 8 時後才來。帶一件輕便雨衣就足夠。'], chart: 'ride', after: ['回到第 3 課。'] },
      ],
      branches: {
        next: { from: 'bot', time: '07:46', title: '第 4 課：冷鋒', text: ['冷鋒是冷空氣團的前緣。冷鋒經過時，通常先下雨，然後才降溫。下一課會解釋原因。'], advance: true },
        nextEnd: { from: 'bot', time: '07:47', text: ['示範課程到此為止。按「從頭播放」可重新開始。'] },
        differently: { from: 'bot', time: '07:45', text: ['找出過去 100 個預報與明天相近的日子，其中約 40 天這裏下了雨。明天就是這樣的一天。'] },
        example: { from: 'bot', time: '07:45', text: ['兩個地方都是 40%。一個在下午 5 時下一場大雨，另一個整天斷斷續續下毛毛雨。數字相同，下午的情況卻截然不同。'] },
        practice: { from: 'bot', time: '07:45', title: '練習', text: ['預報全日 70%，但上午 9 時至 11 時只有 5%。你上午 9 時至 11 時要去野餐，應該怎樣做？'], keyboard: 'practice' },
      },
      practice: {
        options: ['取消', '照去，留意天色', '帶一把大雨傘'],
        correct: 1,
        right: '答對了。70% 屬於一天中的其他時段，你那兩小時幾乎不會下雨。',
        wrong: '全日 70% 在這裏容易誤導。9 時至 11 時只有 5%，野餐不成問題。',
      },
      chart: { title: '明天每小時降雨概率', left: '13 時', mid: '踏單車 15–18 時', right: '20 時' },
      map: {
        label: '課程計劃',
        lessons: ['雲從何而來', '氣壓與風', '降雨概率', '冷鋒', '颱風路徑圖', '讀懂一份完整預報'],
        done: '已完成',
        now: '進行中',
        side: '插問：關於 40% 的預報，在這一課中解答。',
      },
    },
    weather: {
      "title": "只講今天值得知道的天氣",
      "body": [
        "每天早上，它為你關注的地點發一張早報。每個地點最多寫兩件今天要注意的事：降溫、高溫、下雨、空氣差、紫外線強、大風或霧。沒甚麼要注意的地點只留圖示和氣溫。",
        "日間只在兩種情況下再發：快要下雨而早報沒說過，或你所在地點的官方警告發出、升級或解除。"
      ],
      "chat": {
        "avatar": "晴",
        "name": "天氣",
        "sub": "每天早上 7 時"
      },
      "card": {
        "date": "11/21",
        "hours": "日間 08 至 18 時　夜間 18 至翌日 08 時",
        "places": [
          {
            "name": "江北區",
            "line": "比昨天冷 6°，早上出門加件外套",
            "detail": "今天最高 14°，昨天最高 20°",
            "day": [
              "日間 陰",
              "9~14°"
            ],
            "night": [
              "夜間 陰",
              "6~9°"
            ]
          },
          {
            "name": "東湖",
            "line": "14 時至 20 時可能下雨，記得帶傘",
            "detail": "今天還有約 12 mm，概率最高 80%",
            "day": [
              "日間 雨",
              "11~15°"
            ],
            "night": [
              "夜間 雨",
              "9~11°"
            ]
          },
          {
            "name": "南港",
            "air": "良好，今天最高 AQI 31",
            "day": [
              "日間 晴",
              "13~19°"
            ],
            "night": [
              "夜間 晴",
              "10~13°"
            ]
          }
        ]
      },
      "script": [
        {
          "from": "bot",
          "time": "07:00",
          "card": true,
          "text": [
            [
              {
                "b": "江北區"
              },
              "：比昨天冷 6°，早上出門加件外套"
            ],
            [
              {
                "b": "東湖"
              },
              "：14 時至 20 時可能下雨，記得帶傘"
            ]
          ]
        },
        {
          "from": "bot",
          "time": "13:52",
          "text": [
            [
              {
                "b": "海濱"
              },
              "：預報 16 時至 18 時可能下雨"
            ],
            "這段時間約 6 mm，概率最高 70%。"
          ]
        }
      ],
      "rules": {
        "label": "何時發送訊息",
        "rows": [
          [
            "07:00",
            "早報",
            "每天一次。每個地點最多寫兩件要注意的事。它會參考你最近在話題裡說的話，說過的不再重複。"
          ],
          [
            "13:52",
            "下雨提醒",
            "早報沒說過、快要來的雨：一小時雨量至少 2 mm，概率至少 60%。23 時至翌日早報前不發。"
          ],
          [
            "—",
            "官方警告",
            "你所在地點的警告發出、升級或解除時發送，每次變化只發一次。"
          ]
        ]
      }
    },
    chronicle: {
      title: '找回你或許已忘記的那一刻',
      body: [
        '問史庫把你在聊天中提及的事儲存為知識圖譜：人物、地點、事件，以及把它們連起來的陳述。圖譜的結構由我們親手設計。',
        '數個月後，你可以查問某個人、某個地方或某一星期。答案由已儲存的陳述組成，每條陳述都連結到它出自的原句。',
      ],
      steps: { said: (d) => `${d}，在聊天中提到`, statements: (n) => `${n} 條陳述`, timeline: '時間線', asked: '數個月後再問' },
      hint: '按一條陳述，查看它出自哪幾個字。按時間線上的事件即可打開。',
      kinds: { event: '發生', view: '看法', plan: '計劃' },
      planLabel: '計劃',
      events: [
        { date: '09-14', said: '9 月 14 日', title: '計劃到海明鎮度週末', plan: true,
          original: [{ t: '想' }, { t: '找個週末到海明鎮，在燈塔附近住兩晚', s: 0 }, { t: '。' }, { t: '船票星期一開售', s: 1 }, { t: '。' }],
          statements: [{ kind: 'plan', text: '找個週末到海明鎮，在燈塔附近住兩晚。' }, { kind: 'event', text: '往海明鎮的船票星期一開售。' }] },
        { date: '09-27', said: '9 月 27 日', title: '海明鎮，第一天',
          original: [{ t: '乘' }, { t: '8:10 的船到了海明鎮', s: 0 }, { t: '。在舊城' }, { t: '找到一家小麵館，名叫港巷麵館', s: 1 }, { t: '，' }, { t: '魚湯是這幾年喝過最好的', s: 2 }, { t: '。傍晚' }, { t: '走到燈塔看日落', s: 3 }, { t: '。' }],
          statements: [{ kind: 'event', text: '你乘 8:10 的船到了海明鎮。' }, { kind: 'event', text: '你在舊城找到港巷麵館。' }, { kind: 'view', text: '你認為那裏的魚湯是這幾年喝過最好的。' }, { kind: 'event', text: '你傍晚走到燈塔看日落。' }] },
        { date: '09-28', said: '9 月 28 日', title: '海明鎮，第二天',
          original: [{ t: '上午一直下雨，' }, { t: '於是留在碼頭旁的書店', s: 0 }, { t: '。' }, { t: '買了一張海灣的潮汐表', s: 1 }, { t: '。' }],
          statements: [{ kind: 'event', text: '上午下雨，你留在碼頭旁的書店。' }, { kind: 'event', text: '你買了一張海灣的潮汐表。' }] },
        { date: '04-05', said: '10 月 2 日', title: '櫻花開時再去', plan: true,
          original: [{ t: '想在' }, { t: '四月初再到海明鎮一次', s: 0 }, { t: '，那時' }, { t: '燈塔旁的櫻花正盛開', s: 1 }, { t: '。' }],
          statements: [{ kind: 'plan', text: '四月初再到海明鎮一次。' }, { kind: 'view', text: '燈塔旁的櫻花在四月初盛開。' }] },
      ],
      defaultEvent: 1,
      qa: { q: '海明鎮那家魚湯很好喝的麵館叫甚麼？', a: '港巷麵館，位於舊城。這是你在 9 月 27 日旅程第一天找到的，你說那裏的魚湯是這幾年喝過最好的。', link: '查看原句', event: 1, statement: 1 },
    },
    review: {
      title: '單看一次對話看不出來的事',
      body: [
        '每天晚上，它會閱讀過去七天我在各個工具中的對話，以及問史庫和訂閱來源。它會留意三類問題：反覆出現的情況、開始了但未完成的工作，以及互相矛盾的決定。',
        '每一項都附有原話出處和幾個按鈕，例如「三月提醒我」、「不去了」。標記為「不去了」的事，之後的回顧便不會再提及。',
      ],
      chat: { avatar: '回', name: '回顧', sub: '每天晚上 9 時' },
      script: [
        { from: 'bot', time: '21:00', title: '未完成', text: ['你計劃四月初再到海明鎮，但之後沒有再提及訂船票。'], quotes: [['「想在四月初再到海明鎮一次。」', '10 月 2 日，日記']], keyboard: 'f1' },
        { from: 'bot', time: '21:00', title: '決定互相矛盾', text: ['星期一你要求課程放慢，星期四又要求每天上兩課。'], quotes: [['「這星期放慢一點吧。」', '星期一，課程'], ['「可以每天上兩課嗎？」', '星期四，課程']], keyboard: 'f2' },
      ],
      keys: { f1: [['remind', '三月提醒我'], ['drop', '不去了']], f2: [['slow', '保持慢節奏'], ['two', '每天兩課']] },
      replies: { remind: '3 月 1 日會提醒你訂船票。', drop: '已從計劃中刪除，之後不會再提。', slow: '課程維持每天一課。', two: '由明天起，課程每天發送兩課。' },
      side: {
        label: '閱讀甚麼',
        rows: [
          ['7 天', '對話', '來自各個工具：Telegram、終端機、編程 agent。'],
          ['7 天', '問史庫和訂閱來源', '發生了甚麼、計劃了甚麼、讀了甚麼。'],
          ['星期日', '每週回看', '去年同一星期，以及之後改變了的看法。'],
        ],
        checkLabel: '引用核對',
        checkText: '每項引用都會與標示的出處核對，無法對應出處的引用不會發送。',
      },
    },
    widgets: {
      title: '一邊回答，一邊畫圖',
      body: ['當問題涉及形狀、趨勢或路線時，agent 會畫一張圖，以圖片形式放進回覆，然後加以解說。', '按下圖片會打開可在手機上操作的互動版本。'],
      chat: { avatar: '天', name: '看懂天氣預報', sub: '第 4 課：冷鋒' },
      script: [
        { from: 'me', time: '20:31', text: ['冷鋒過境時，為甚麼會先下雨，之後才降溫？'] },
        { from: 'bot', time: '20:31', widget: true, text: ['冷空氣較重，會像楔子一樣從下方插入。前方溫暖潮濕的空氣被抬升並冷卻，形成右邊的雲層，雨就是從這團雲落下的。', '要等冷空氣楔子本身抵達你所在的位置，你才會感到寒冷，通常比開始下雨晚數小時。'] },
      ],
      widget: {
        title: '冷鋒過境側面圖',
        cold: '冷空氣插入',
        warm: '暖空氣被抬升',
        open: '打開互動版本',
        slider: '由現在起計的小時數',
        you: '你在這裏',
        states: ['溫暖多雲，雨正在接近。', '正在下雨，被抬升的暖空氣就在你上方。', '轉冷並逐漸放晴，冷空氣已經抵達。'],
      },
      steps: {
        label: 'widget 的製作過程',
        rows: [
          ['提議', 'agent 判斷畫圖有幫助，提出幾種視覺風格。'],
          ['抽選', '主機從這幾種風格中隨機選出一種，避免所有 widget 都是同一個樣子。'],
          ['審查', '另一個負責審查的模型會檢查草稿截圖，找出事實錯誤和措辭不清之處。'],
          ['發送', '只有通過審查的 widget 才會發出：聊天中一張圖片，並附上互動頁面的連結。'],
        ],
      },
    },
    built: {
      title: '由 agent 開發和維護',
      body: ['做甚麼、先做甚麼由我決定。設計、編寫程式、評審和部署由 Claude Code 和 Codex 的 agent 完成。', '每項改動都是一個事項，並寫明驗收條件。編寫程式的 agent 不能自行驗收，必須由另一個 agent 在乾淨的檢出中逐條核對。'],
      label: '示例：一個事項',
      demo: {
        id: 'DEV-4f2a91c0',
        title: '天氣提醒參考我的日程',
        quoteLabel: '授權原話：',
        quote: '「下雨提醒應該知道我何時出門踏單車。」',
        acceptLabel: '驗收條件',
        stages: ['提出', '登記', '設計', '實現', '驗收', '上線', '監察運行'],
        conditions: ['踏單車前後三小時內降雨概率超過 60%，發出一則提醒。', '全日日程不算作在戶外。', '沒有雨的日子不發送任何訊息。'],
        states: { open: '待驗', met: '通過', failed: '未通過' },
        who: { me: '我', cc: 'Claude Code', cx: 'Codex', sys: '系統' },
        statuses: ['已提出', '已登記', '已選定設計', '已提交', '退回作者', '已修正', '驗收通過', '已上線', '運行中'],
        logs: ['在 Telegram 提出。', '已登記，並寫下三項驗收條件。', '在 Paper 選定提醒的 B 版本。', '提交 8c1e0d2，並附上測試。', '第 2 項在乾淨的檢出中未通過，已退回。', '略過全日日程，提交 3b7f5a1。', '三項條件均在乾淨的檢出中通過。', '合併並部署 3b7f5a1，已檢查服務。', '翌日：踏單車前發出一則提醒。'],
      },
    },
  },

  ja: {
    htmlLang: 'ja',
    ui: {
      tagline: "Telegram で使うパーソナルアシスタント",
      fictional: 'このサイトのデータはすべて架空です。',
      nav: {"home": "ホーム", "chronicle": "日記", "review": "ふりかえり", "widgets": "操作できる図解", "course": "コース", "weather": "天気", "built": "作り方"},
      replay: '最初から',
      pause: '一時停止',
      play: '再生',
      step: (n, t) => `${t} ステップ中 ${n}`,
      close: '閉じる',
    },
    home: {
      "title": "自分のために作り込んだアシスタント",
      "body": [
        "Pinejay は自分で作ったパーソナルアシスタントです。主に Telegram で話しかけています。その日のことをメモしたり、質問したり、リマインドを頼んだりします。",
        "その日のことを話すと日記に残してくれて、何か月たっても探し出せます。夜は、その日言ったのにまだやっていないことを挙げてくれます。朝は、今日の天気で気をつけることを教えてくれます。"
      ],
      "aside": "新しいコーディングエージェントではなく、エージェントの中核を自分で作り直すものでもありません。コンテキストのキャッシュや操作といった低レベルの実装は変化が速く、フレームワークごとに独自のエコシステムがあり、一人では追いきれません。そこで Pinejay は成熟した Claude SDK と Codex SDK を使い、その上に抽象化したインターフェースを作っています。時間は主に、自分が欲しいアシスタント機能に使っています。",
      "chat": {
        "avatar": "P",
        "name": "Pinejay",
        "sub": "木曜日"
      },
      "by": {
        "journal": "日記",
        "review": "ふりかえり",
        "weather": "天気"
      },
      "keys": [
        "お願い",
        "いらない"
      ],
      "keyReplies": [
        "わかりました。3 月末にリマインドします。",
        "わかりました。リマインドはしません。"
      ],
      "script": [
        {
          "from": "me",
          "time": "12:40",
          "text": [
            "今日また海明町へ。桟橋のそばで焼き魚を食べた。4 月の桜の頃にもう一度来たい。"
          ]
        },
        {
          "from": "bot",
          "by": "journal",
          "time": "12:41",
          "text": [
            "記録しました。前回の海明町は 9 月 27 日で、そのときもまた来たいと言っていました。3 月末にフェリーの予約をリマインドしますか？"
          ],
          "keyboard": "remind"
        },
        {
          "from": "bot",
          "by": "review",
          "time": "21:00",
          "text": [
            "月曜に論文の第 3 節を指導教員に送ると言っていましたが、まだ送っていません。明日の朝 9 時にリマインドしますか？"
          ]
        },
        {
          "from": "me",
          "time": "21:02",
          "text": [
            "10 時にして。朝はゼミがある。"
          ]
        },
        {
          "from": "bot",
          "by": "review",
          "time": "21:02",
          "text": [
            "わかりました。明日 10 時に第 3 節を送るようリマインドします。"
          ]
        },
        {
          "from": "bot",
          "by": "weather",
          "time": "翌日 07:00",
          "text": [
            "昨日より 6° 寒いので、上着を一枚。"
          ]
        }
      ],
      "timeline": [
        [
          0,
          "12:40",
          "メモする"
        ],
        [
          1,
          "12:41",
          "前の話につなげる"
        ],
        [
          2,
          "21:00",
          "夜のふりかえり"
        ],
        [
          5,
          "07:00",
          "朝の天気"
        ]
      ],
      "featuresTitle": "ほかにはない 5 つのこと",
      "demo": "デモ",
      "features": [
        [
          "chronicle",
          "日記",
          "チャットで何気なく話したことを日記に残し、整理するときに場所・予定・出来事を時系列でつなげます。"
        ],
        [
          "review",
          "ふりかえり",
          "毎晩その日の会話をすべて読み返し、言ったのにまだやっていないことを教えてくれます。"
        ],
        [
          "widgets",
          "操作できる図解",
          "図で説明したほうがわかりやすい質問には、操作できる図を回答の中に直接描いて説明します。"
        ],
        [
          "course",
          "コース",
          "自分で用意した資料からコースを作り、学習の進み具合に合わせて速さと難しさを調整します。"
        ],
        [
          "weather",
          "天気",
          "毎朝の天気レポートで、今日気をつけたいこと（冷え込み、雨、空気の悪さ）を知らせます。"
        ]
      ],
      "howTitle": "しくみ",
      "how": [
        [
          "Pinejay はオープンソースの ",
          {
            "text": "NanoClaw",
            "href": "https://github.com/qwibitai/nanoclaw"
          },
          " をもとに開発し、自分のサーバーで動かしています。"
        ],
        "Pinejay とは主に Telegram のグループでやり取りします。グループのトピックごとに専用の AI アシスタントがいて、それぞれ自分の隔離環境（Docker または Apple Container）で動きます。Claude と Codex を呼び出すキーはサーバーにだけ置き、ホストのブリッジ経由で使います。",
        "なぜパソコン全体で動かさないのか。アシスタントは自分でコマンドを実行し、ファイルを書き換えられるので、権限が大きいからです。隔離環境の中なら、ミスをしたり、Web ページの悪意ある文章にだまされたりしても、壊れるのはそのアシスタントの環境だけで、ほかのアシスタントには影響しません。その代わり、パソコンのアプリやファイルは自由に使えず、必要なものはホストが一つずつ開放します。"
      ],
      "diagram": {
        "you": [
          "",
          "あなた",
          "Telegram、WeChat、Web"
        ],
        "host": [
          "サーバーで常時稼働",
          "ホスト",
          "メッセージを渡し、記録を保存し、図解を Web ページとして公開"
        ],
        "records": [
          "ホストが保管",
          "記録",
          "日記、コース計画、リマインダーをデータベースに保存"
        ],
        "model": [
          "Claude または Codex",
          "モデル",
          "言葉を理解し、返信を書く"
        ],
        "group": "エージェントはそれぞれ自分の隔離環境で動く",
        "agents": [
          "コースのエージェント",
          "天気のエージェント",
          "日記のエージェント"
        ],
        "agentDesc": "自分のファイルとメモだけ",
        "arrows": {
          "message": "メッセージを送る",
          "toAgent": "そのトピックのエージェントへ",
          "asks": "モデルを呼ぶ",
          "reply": "返信（図解つきのことも）",
          "keeps": "保存"
        }
      }
    },
    course: {
      title: 'あなたに合わせて仕立てるコース',
      body: [
        '何を、なぜ学びたいかをエージェントに伝えます。エージェントは目標とレベルに合わせてコース計画を作り、あなたが承認してから始めます。',
        '各回の下には四つのボタンがあります。次の回へ、別の説明、例を見る、練習する。自分で質問することもできます。エージェントは答えたあと、その質問を計画に書き留めて元の回に戻ります。',
      ],
      chat: { avatar: '天', name: '天気予報を読む', sub: '第 3 回：降水確率' },
      keys: { next: 'わかった、次へ', differently: '別の説明で', example: '例を見る', practice: '練習する' },
      script: [
        { from: 'bot', time: '07:42', title: '第 3 回：降水確率', text: ['40% は、地域の 40% で降る、一日の 40% の時間降る、という意味ではありません。今日と似た日のうち、およそ 10 日に 4 日はここで雨が降る、という意味です。'], keyboard: 'lesson' },
        { from: 'me', time: '07:44', text: ['明日 15 時から 18 時まで川沿いをサイクリング。予報は 40%。レインジャケットはいる？'], side: true },
        { from: 'bot', time: '07:44', text: ['40% は一日全体の数字です。走る 3 時間は 10〜25% で、雨は 20 時以降。薄手のジャケットで十分です。'], chart: 'ride', after: ['第 3 回に戻ります。'] },
      ],
      branches: {
        next: { from: 'bot', time: '07:46', title: '第 4 回：寒冷前線', text: ['寒冷前線は冷たい空気の塊の先端です。通過するとき、たいてい先に雨が降り、そのあと寒くなります。理由は次の回で説明します。'], advance: true },
        nextEnd: { from: 'bot', time: '07:47', text: ['デモのコースはここまでです。「最初から」で最初から見られます。'] },
        differently: { from: 'bot', time: '07:45', text: ['明日と似た予報だった過去の 100 日のうち、約 40 日はここで雨が降りました。明日もそういう日の一つです。'] },
        example: { from: 'bot', time: '07:45', text: ['二つの町がどちらも 40%。一方は 17 時に強い雨が一度だけ、もう一方は一日中小雨が降ったりやんだり。数字は同じでも、午後の様子はまったく違います。'] },
        practice: { from: 'bot', time: '07:45', title: '練習', text: ['予報は一日 70%、でも 9 時から 11 時は 5%。9 時から 11 時にピクニックの予定です。どうしますか？'], keyboard: 'practice' },
      },
      practice: {
        options: ['中止する', '行く、空を見ながら', '大きな傘を持つ'],
        correct: 1,
        right: '正解です。70% は一日の別の時間帯の数字で、あなたの 2 時間はほぼ降りません。',
        wrong: '一日 70% という数字にまどわされています。9 時から 11 時は 5% だけなので、ピクニックは大丈夫です。',
      },
      chart: { title: '明日の時間ごとの降水確率', left: '13 時', mid: 'サイクリング 15–18 時', right: '20 時' },
      map: {
        label: 'コース計画',
        lessons: ['雲はどこから来るか', '気圧と風', '降水確率', '寒冷前線', '台風の進路図', '予報を最初から最後まで読む'],
        done: '済み',
        now: 'いまここ',
        side: '寄り道の質問：40% の予報について。この回の中で答えました。',
      },
    },
    weather: {
      "title": "今日の天気で知っておくべきことだけ",
      "body": [
        "毎朝、登録した地点の天気カードを一枚送ります。各地点で今日気をつけることを最大 2 つ：冷え込み、暑さ、雨、空気の悪さ、強い紫外線、強風、霧。気をつけることがない地点はアイコンと気温だけです。",
        "日中に送るのは二つの場合だけです。朝のカードで触れていない雨が近いとき、そして地点の公式の警報が出た・上がった・解除されたとき。"
      ],
      "chat": {
        "avatar": "晴",
        "name": "天気",
        "sub": "毎朝 7 時"
      },
      "card": {
        "date": "11/21",
        "hours": "日中 8 時から 18 時　夜間 18 時から翌日 8 時",
        "places": [
          {
            "name": "江北区",
            "line": "昨日より 6° 寒い、朝は上着を一枚",
            "detail": "今日の最高 14°、昨日は 20°",
            "day": [
              "日中 くもり",
              "9~14°"
            ],
            "night": [
              "夜間 くもり",
              "6~9°"
            ]
          },
          {
            "name": "東湖",
            "line": "14 時から 20 時に雨の可能性、傘を忘れずに",
            "detail": "今日はあと約 12 mm、確率は最高 80%",
            "day": [
              "日中 雨",
              "11~15°"
            ],
            "night": [
              "夜間 雨",
              "9~11°"
            ]
          },
          {
            "name": "南港",
            "air": "良好、今日の最高 AQI 31",
            "day": [
              "日中 晴れ",
              "13~19°"
            ],
            "night": [
              "夜間 晴れ",
              "10~13°"
            ]
          }
        ]
      },
      "script": [
        {
          "from": "bot",
          "time": "07:00",
          "card": true,
          "text": [
            [
              {
                "b": "江北区"
              },
              "：昨日より 6° 寒い、朝は上着を一枚"
            ],
            [
              {
                "b": "東湖"
              },
              "：14 時から 20 時に雨の可能性、傘を忘れずに"
            ]
          ]
        },
        {
          "from": "bot",
          "time": "13:52",
          "text": [
            [
              {
                "b": "川沿い"
              },
              "：16 時から 18 時に雨の予報"
            ],
            "この時間帯で約 6 mm、確率は最高 70%。"
          ]
        }
      ],
      "rules": {
        "label": "いつメッセージを送るか",
        "rows": [
          [
            "07:00",
            "朝のカード",
            "一日一回。各地点で気をつけることを最大 2 つ。トピックでの最近の発言を参考にし、伝えたことは繰り返しません。"
          ],
          [
            "13:52",
            "雨のお知らせ",
            "朝のカードで触れていない、もうすぐ降る雨：1 時間に 2 mm 以上、確率 60% 以上。23 時から翌朝のカードまでは送りません。"
          ],
          [
            "—",
            "公式の警報",
            "地点の警報が出た・上がった・解除されたとき。変化ごとに一度だけ送ります。"
          ]
        ]
      }
    },
    chronicle: {
      title: '忘れかけた瞬間を見つけ出す',
      body: [
        'クロニクルは、チャットで話したことを知識グラフとして保存します。人、場所、出来事、そしてそれらをつなぐ記述です。グラフの構造は私たちが手で設計しました。',
        '何か月後でも、ある人、ある場所、ある週について聞けます。答えは保存された記述から組み立てられ、記述はそれぞれ元の一文につながっています。',
      ],
      steps: { said: (d) => `${d}、チャットで話したこと`, statements: (n) => `記述 ${n} 件`, timeline: 'タイムライン', asked: '数か月後に聞く' },
      hint: '記述をタップすると、どの言葉から来たかがわかります。出来事をタップすると開きます。',
      kinds: { event: '出来事', view: '考え', plan: '予定' },
      planLabel: '予定',
      events: [
        { date: '09-14', said: '9 月 14 日', title: '汐見で週末を過ごす計画', plan: true,
          original: [{ t: '週末に汐見へ行って、灯台の近くに 2 泊したい', s: 0 }, { t: '。' }, { t: 'フェリーの切符は月曜発売', s: 1 }, { t: '。' }],
          statements: [{ kind: 'plan', text: '週末に汐見へ行き、灯台の近くに 2 泊する。' }, { kind: 'event', text: '汐見行きのフェリーの切符は月曜に発売される。' }] },
        { date: '09-27', said: '9 月 27 日', title: '汐見、一日目',
          original: [{ t: '8:10 のフェリーで汐見に着いた', s: 0 }, { t: '。旧市街で' }, { t: '小さな食堂「港小路食堂」を見つけた', s: 1 }, { t: '。' }, { t: '魚のスープはここ数年でいちばん', s: 2 }, { t: '。夕方は' }, { t: '灯台まで歩いて夕日を見た', s: 3 }, { t: '。' }],
          statements: [{ kind: 'event', text: '8:10 のフェリーで汐見に着いた。' }, { kind: 'event', text: '旧市街で港小路食堂を見つけた。' }, { kind: 'view', text: '魚のスープがここ数年でいちばんだと思った。' }, { kind: 'event', text: '夕方、灯台まで歩いて夕日を見た。' }] },
        { date: '09-28', said: '9 月 28 日', title: '汐見、二日目',
          original: [{ t: '午前中ずっと雨で、' }, { t: '桟橋のそばの本屋で過ごした', s: 0 }, { t: '。' }, { t: '湾の潮見表を買った', s: 1 }, { t: '。' }],
          statements: [{ kind: 'event', text: '雨のため、午前中は桟橋のそばの本屋で過ごした。' }, { kind: 'event', text: '湾の潮見表を買った。' }] },
        { date: '04-05', said: '10 月 2 日', title: '桜の季節にもう一度', plan: true,
          original: [{ t: '4 月の初めにもう一度汐見へ行きたい', s: 0 }, { t: '。そのころ' }, { t: '灯台のそばの桜が咲く', s: 1 }, { t: '。' }],
          statements: [{ kind: 'plan', text: '4 月の初めにもう一度汐見へ行く。' }, { kind: 'view', text: '灯台のそばの桜は 4 月の初めに咲く。' }] },
      ],
      defaultEvent: 1,
      qa: { q: '汐見で魚のスープがおいしかった食堂、なんて名前だっけ？', a: '港小路食堂です。旧市街にあります。旅行初日の 9 月 27 日に見つけて、魚のスープがここ数年でいちばんだと話していました。', link: '元の文を見る', event: 1, statement: 1 },
    },
    review: {
      title: '一つの会話だけでは見えないこと',
      body: [
        '毎晩、過去 7 日間の、あらゆるツールでの会話とクロニクル、フィードを読みます。注目するのは三種類の問題です。繰り返し起きること、始めたまま終わっていない作業、互いに矛盾する決定です。',
        'どの項目にも元の発言の出典と、いくつかのボタンがつきます。たとえば「3 月にリマインド」「やめた」。「やめた」にした項目は、それ以降のふりかえりで取り上げません。',
      ],
      chat: { avatar: 'ふ', name: 'ふりかえり', sub: '毎晩 21 時' },
      script: [
        { from: 'bot', time: '21:00', title: 'やりかけ', text: ['4 月初めにまた汐見へ行く予定でしたが、フェリーの予約の話はその後出ていません。'], quotes: [['「4 月の初めにもう一度汐見へ行きたい。」', '10 月 2 日、日記']], keyboard: 'f1' },
        { from: 'bot', time: '21:00', title: '矛盾する決定', text: ['月曜はコースのペースを落とすよう頼み、木曜は一日 2 回にしてほしいと頼みました。'], quotes: [['「今週はゆっくりにしよう。」', '月曜、コース'], ['「一日 2 回できる？」', '木曜、コース']], keyboard: 'f2' },
      ],
      keys: { f1: [['remind', '3 月にリマインド'], ['drop', 'やめた']], f2: [['slow', 'ゆっくりのまま'], ['two', '一日 2 回']] },
      replies: { remind: '3 月 1 日にフェリーの予約をリマインドします。', drop: '予定から外しました。今後は取り上げません。', slow: 'コースは一日 1 回のままにします。', two: '明日からコースは一日 2 回送ります。' },
      side: {
        label: '読むもの',
        rows: [
          ['7 日', '会話', 'すべてのツールから。Telegram、ターミナル、コーディングエージェント。'],
          ['7 日', 'クロニクルとフィード', '起きたこと、予定したこと、読んだもの。'],
          ['日曜', '週ごとのふりかえり', '去年の同じ週と、その後変わった考え。'],
        ],
        checkLabel: '引用の確認',
        checkText: '引用はすべて、示した出典と照合されます。出典を確認できない引用は送りません。',
      },
    },
    widgets: {
      title: '答えながら図を描く',
      body: ['形や傾向、経路についての質問には、エージェントが図を描いて画像として返信に入れ、そのあと説明します。', '画像をタップすると、スマホで操作できるインタラクティブ版が開きます。'],
      chat: { avatar: '天', name: '天気予報を読む', sub: '第 4 回：寒冷前線' },
      script: [
        { from: 'me', time: '20:31', text: ['寒冷前線が通るとき、どうして先に雨が降って、寒くなるのはあとなの？'] },
        { from: 'bot', time: '20:31', widget: true, text: ['冷たい空気は重いので、くさびのように下へ入り込みます。前にある暖かく湿った空気が持ち上げられて冷え、右の雲になります。雨はこの雲から降ります。', '寒さを感じるのは、くさびそのものが届いてから。雨が降り始めて数時間後です。'] },
      ],
      widget: {
        title: '寒冷前線を横から見る',
        cold: '冷たい空気が入り込む',
        warm: '暖かい空気が持ち上がる',
        open: 'インタラクティブ版を開く',
        slider: '今から何時間後',
        you: '現在地',
        states: ['暖かく曇り。雨が近づいています。', '雨。持ち上げられた暖かい空気が真上にあります。', '寒くなって晴れてきました。冷たい空気が届きました。'],
      },
      steps: {
        label: 'ウィジェットができるまで',
        rows: [
          ['提案', 'エージェントが図があると役立つと判断し、いくつかの見た目のスタイルを提案します。'],
          ['抽選', 'ホストがその中から一つをランダムに選びます。ウィジェットが同じ見た目ばかりにならないためです。'],
          ['審査', '別のレビュー用モデルが下書きのスクリーンショットを見て、事実の誤りや分かりにくい表現を確認します。'],
          ['送信', '審査に通ったウィジェットだけを送ります。チャットに画像を一枚と、インタラクティブなページへのリンクです。'],
        ],
      },
    },
    built: {
      title: 'エージェントが作り、動かし続ける',
      body: ['何を、どの順番で作るかは私が決めます。設計、コード、レビュー、デプロイは Claude Code と Codex のエージェントが行います。', '変更はすべて作業項目になり、受け入れ条件が書かれます。コードを書いたエージェントは承認できず、別のエージェントがクリーンな checkout で条件を一つずつ確認します。'],
      label: '例：一つの作業項目',
      demo: {
        id: 'DEV-4f2a91c0',
        title: '天気のお知らせが予定表を見る',
        quoteLabel: '承認の言葉：',
        quote: '「雨のお知らせは、自転車で出かける時間を知っていてほしい。」',
        acceptLabel: '受け入れ条件',
        stages: ['依頼', '登録', '設計', '実装', '検証', 'リリース', '監視'],
        conditions: ['サイクリングの前後 3 時間以内に降水確率が 60% を超えたら、お知らせを 1 通送る。', '終日の予定は屋外とみなさない。', '雨のない日は何も送らない。'],
        states: { open: '未確認', met: '合格', failed: '不合格' },
        who: { me: '私', cc: 'Claude Code', cx: 'Codex', sys: 'システム' },
        statuses: ['依頼済み', '登録済み', 'デザイン決定', '提出済み', '作者に差し戻し', '修正済み', '検証済み', '公開中', '監視中'],
        logs: ['Telegram で依頼。', '受け入れ条件 3 つで登録。', 'Paper でお知らせの B 案を選択。', '8c1e0d2 をテスト付きで提出。', '条件 2 がクリーンな checkout で不合格。差し戻し。', '終日の予定を除外し、3b7f5a1 を提出。', 'クリーンな checkout で 3 条件すべて合格。', '3b7f5a1 をマージしてデプロイ。サービスを確認。', '翌日：サイクリング前にお知らせを 1 通送信。'],
      },
    },
  },
};

// The work item demo steps have the same shape in every language; only the words differ.
const DEMO_SHAPE = [
  { stage: 0, who: 'me', time: '09:12' },
  { stage: 1, cond: ['open', 'open', 'open'], who: 'cc', time: '09:13' },
  { stage: 2, cond: ['open', 'open', 'open'], who: 'me', time: '09:40' },
  { stage: 3, cond: ['open', 'open', 'open'], who: 'cc', time: '11:05' },
  { stage: 4, tone: 'bad', cond: ['met', 'failed', 'met'], who: 'cx', time: '11:31' },
  { stage: 3, cond: ['met', 'open', 'met'], who: 'cc', time: '12:02' },
  { stage: 4, tone: 'good', cond: ['met', 'met', 'met'], who: 'cx', time: '12:20' },
  { stage: 5, tone: 'live', cond: ['met', 'met', 'met'], who: 'cc', time: '12:26' },
  { stage: 6, tone: 'live', cond: ['met', 'met', 'met'], who: 'sys', time: '13:52' },
];
for (const lang of Object.values(window.CONTENT)) {
  const d = lang.built.demo;
  d.steps = DEMO_SHAPE.map((s, i) => ({ ...s, status: d.statuses[i], log: { time: s.time, who: s.who, text: d.logs[i] } }));
}
