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
        "Pinejay is a personal assistant I built. I mostly chat with it in Telegram: I jot down what happened today, ask it questions, or have it remind me of something.",
        "I tell it about my day and it keeps a journal, so it can find things for me when I need them. In the morning it tells me what to watch for in today’s weather; in the evening it goes over what I said I’d do but haven’t."
      ],
      "aside": "It isn’t another coding agent, and it isn’t an agent core built from scratch. Low-level work such as context caching and context handling changes fast, and each framework has its own ecosystem; one developer working alone can hardly keep up. So Pinejay uses the mature Claude and Codex SDKs and builds an abstract interface on top of them. I put most of my effort into the assistant features I want.",
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
          "A morning report each day on the weather worth watching."
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
        "I talk to Pinejay mostly in a Telegram group. Each topic in the group is handled by its own AI assistant, and each assistant runs in its own sealed-off space (Docker or Apple Container). The API credentials stay on the host; the assistants call the APIs through a gateway and never touch the sensitive credentials themselves.",
        "Why not let it run on the whole computer? The assistants run commands and edit files on their own, with wide access. In a sealed-off space, an assistant that makes a mistake, or is misled by malicious text on a web page, can at most break its own space, and the other assistants are unaffected. The cost is that they can’t freely use the computer’s apps and files; each permission has to be set up separately."
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
          "Passes messages on, keeps the records, publishes diagrams as web pages, runs scheduled tasks"
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
          "returns": "Returns the result",
          "handsBack": "Hands back the reply and diagram",
          "reply": "Reply, sometimes with a diagram",
          "keeps": "Save"
        }
      }
    },
    course: {
      title: "Take a course built from my own material",
      body: [
        "I tell it what I want to learn and hand over the material I have. It drafts a course plan first, and the course starts once I’ve settled on the plan.",
        "Each lesson has four quick actions under it: next lesson, explain it another way, give an example, practice. If I want to ask something else midway, I just ask; it answers, notes the question on the plan and carries on. It also watches how I answer and adjusts the pace and difficulty.",
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
        side: "Asked midway what 40% means; answered in this lesson.",
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
      title: "Turning what I say in chat into a journal",
      body: [
        "Things I mention in passing in chat get split into separate records: what happened, what I think, what I plan to do. They are put in time order and saved to a database.",
        "Long afterwards I can ask about a place, a person or a week, and it answers from these records. Each record opens to show what I actually said at the time.",
      ],
      steps: { said: (d) => `Said in chat, ${d}`, statements: (n) => `${n} record${n === 1 ? '' : 's'}`, timeline: 'On the timeline', asked: 'Asked months later' },
      hint: "Tap a record to see which words of the original it came from. Tap an event on the timeline to open it.",
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
      title: "A look back every evening",
      body: [
        "Every evening it goes through my recent chats, my journal and the articles I’ve read, looking for problems that keep coming back, things I started and didn’t finish, and places where I said two different things.",
        "When it finds something, it sends it to me with what I said at the time. Quick actions underneath let me reply right there: remind me later, or tell it I’m not doing this, and it won’t bring it up again.",
      ],
      chat: { avatar: 'R', name: 'Review', sub: 'Every evening at 9' },
      script: [
        { from: 'bot', time: '21:00', title: 'Unfinished', text: ['You planned to go back to Seabright in early April. The ferry booking you mentioned has not come up since.'], quotes: [['“Want to go back to Seabright in early April.”', 'Oct 2, journal']], keyboard: 'f1' },
        { from: 'bot', time: '21:00', title: "Said two different things", text: ['On Monday you asked the course to slow down. On Thursday you asked it for two lessons a day.'], quotes: [['“Let’s take it slower this week.”', 'Mon, course'], ['“Can we do two lessons a day?”', 'Thu, course']], keyboard: 'f2' },
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
          ['7 days', "Chats", "What I said in Telegram, the terminal and coding tools."],
          ['7 days', "Journal and feed", "What happened, what I plan to do, what I read."],
          ['Sunday', 'Weekly look back', 'The same week last year, and opinions that have changed since.'],
        ],
        checkLabel: "Checking quotes",
        checkText: "Each quote is checked against the source it names. If they don’t match, it isn’t sent.",
      },
    },
    widgets: {
      title: "If it’s hard to explain, it draws a diagram",
      body: [
        "When a question is easier to explain with a picture, it puts a diagram in the answer and talks me through it.",
        "Tap the diagram and you can drag and tap through it on a phone.",
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
        label: "How a diagram is made",
        rows: [
          ['Propose', "When it thinks a diagram would help, it suggests a few ways to draw it."],
          ["Pick a style", "The host picks one at random, so the diagrams don’t all look the same."],
          ["Check", "Another model looks at a screenshot of the draft for anything wrong or hard to follow."],
          ['Send', "Only drafts that pass are sent: an image in the chat and a link to a page you can use."],
        ],
      },
    },
    built: {
      title: "How Pinejay is built",
      body: [
        "I decide what to design and build. The actual design, code, checking and deploying are done by Claude Code and Codex.",
        "Every change is first registered as a work item that says what counts as done. Whoever wrote the code can’t declare it done; another AI checks it from scratch, and it goes live only when every acceptance criterion passes.",
      ],
      label: "Example: today’s change to the weather digest",
      demo: {
        id: 'DEV-605d37ef',
        title: "The digest covers more than rain",
        quoteLabel: "Me: ",
        quote: "“Shouldn’t it mention haze, cold snaps and sun protection?”",
        acceptLabel: 'Acceptance criteria',
        stages: ['Ask', 'Register', 'Design', 'Implement', 'Verify', 'Ship', 'Watch'],
        conditions: ["On dry days it no longer says “No rain expected today”.", "Rain the digest didn’t mention still gets an alert during the day.", "The digest and panel no longer list data sources every day."],
        states: { open: 'Open', met: 'Met', failed: 'Failed' },
        who: { me: 'me', cc: 'Claude Code', cx: 'Codex', sys: 'the system' },
        statuses: ['Asked', 'Registered', 'Design picked', 'Submitted', 'Back to the author', 'Fixed', 'Verified', 'Live', 'Watching'],
        logs: ['Asked in Telegram.', 'Registered with three acceptance criteria.', "Picked the digest layout in Paper.", "Submitted with tests.", "Criterion 2 failed: rain the digest hadn’t mentioned was treated as mentioned. Sent back.", "Fixed and resubmitted.", "Another AI checked it: all three criteria met.", "Merged and deployed. Service checked.", "Next morning: the digest mentioned the cold and sun protection."],
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
      "title": "一个高度定制化的\n私人助手",
      "body": [
        "Pinejay 是我自己做的私人助手。我主要在 Telegram 里和它聊天交互：随手记下当天的事，问它问题，或是让它提醒我什么事情。",
        "我把每天的事随手告诉它，它记进日记，需要的时候还能帮我找回来。它能早上告诉我今天的天气要注意什么，晚上回顾我这一天说了但还没做的事。"
      ],
      "aside": "它不是又一个编程智能体，也不是从零手搓的一个智能体内核。上下文缓存、上下文操作这类底层实现变化很快，每个框架有各自的生态，个人开发者很难高强度持续跟进。所以 Pinejay 使用成熟的 Claude SDK 和 Codex SDK，在它们之上实现一层抽象接口。我把精力主要花在我想要的私人助手功能上。",
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
          "在聊天里随手说的事，它记入日记中。整理的时候把地方、计划和经历按时间连起来。"
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
          "每天推送一条早报，提醒你今天值得注意的天气情况。"
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
        "Pinejay 主要通过 Telegram 群进行交互。Telegram 群里每个话题由一个单独的 AI 智能体助手负责，每个助手在自己的隔离环境（Docker 或者 Apple Container）里运行。API 凭据只保存在主机上，智能体通过网关调用而无需直接接触敏感凭据。",
        "为什么不让它直接在整台电脑上运行？这些助手能够自己执行命令、修改文件，拥有很大的访问权限。放在隔离环境里，一个助手即使出错，或者被网页上的恶意文字误导，它最多弄坏自己的环境，也不会影响其他助手。代价是它们不能随手使用电脑上的软件和文件，需要单独配置权限。"
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
          "传递消息，保存记录，把说明图发布成网页，调度定时任务"
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
          "returns": "返回结果",
          "handsBack": "交回回复和说明图",
          "reply": "回复，可带说明图",
          "keeps": "保存"
        }
      }
    },
    course: {
      title: "用自己的材料\n上一门课",
      body: [
        "我把想学的东西和手头的材料告诉它，它先拟一份课程计划，我确定了方案才开课。",
        "每一讲下面有四个快捷操作：下一讲、换个讲法、举个例子、练一下。中途想问别的可以直接问，它答完会把问题记进计划，再接着讲。它也会看我答得怎么样，调整快慢和难度。",
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
        side: "中途问了 40% 是什么意思，这一讲里答了。",
      },
    },
    weather: {
      "title": "只说今天\n值得知道的天气",
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
      title: "把聊天里说的事\n记成日记",
      body: [
        "我在聊天里随手说的事，它会拆成一条条记录保存：发生了什么、我怎么看、打算做什么，再按时间排好，存储到数据库中。",
        "过了很久再问某个地方、某个人或某一周，它可以用这些记录回答，每条记录都能点开看到我当时的原话。",
      ],
      steps: { said: (d) => `${d}，在聊天里说的`, statements: (n) => `${n} 条记录`, timeline: '时间线', asked: '几个月后再问' },
      hint: "点一条记录，看它出自原话里的哪几个字。点时间线上的事件可以打开它。",
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
      title: "每天晚上\n回看一遍",
      body: [
        "每天晚上，它把最近的聊天、日记和我读过的文章翻一遍，看有没有反复出现的问题、开了头没做完的事，或者前后说法不一致的地方。",
        "找到了就发给我，附上我当时说的原话。下面有快捷操作可以直接回复：让它到时候再提醒，或者告诉它这件事不做了，以后就不再提。",
      ],
      chat: { avatar: '回', name: '回顾', sub: '每天晚上 9 点' },
      script: [
        { from: 'bot', time: '21:00', title: '没做完', text: ['你打算四月初再去海明镇，但之后再没提过订船票。'], quotes: [['“想四月初再去一次海明镇。”', '10 月 2 日，日记']], keyboard: 'f1' },
        { from: 'bot', time: '21:00', title: "前后说法不一致", text: ['周一你让课程放慢，周四又要每天上两讲。'], quotes: [['“这周慢一点吧。”', '周一，课程'], ['“能不能一天上两讲？”', '周四，课程']], keyboard: 'f2' },
      ],
      keys: { f1: [['remind', '三月提醒我'], ['drop', '不去了']], f2: [['slow', '保持慢节奏'], ['two', '一天两讲']] },
      replies: { remind: '3 月 1 日提醒你订船票。', drop: '已从计划里去掉，之后不再提。', slow: '课程保持每天一讲。', two: '从明天起，课程每天发两讲。' },
      side: {
        label: "它读哪些",
        rows: [
          ['7 天', '对话', "Telegram、终端和编程工具里说过的话。"],
          ['7 天', "日记和订阅", "发生了什么、打算做什么、读了什么。"],
          ['周日', '每周回看', '去年的同一周，以及之后改变了的看法。'],
        ],
        checkLabel: "原话核对",
        checkText: "每句原话都会和标注的出处对一遍，对不上的不发。",
      },
    },
    widgets: {
      title: "讲不清的地方，\n画张图解释",
      body: ["问题用图更好解释清楚时，它会在回答里放一张图，再对着图讲。", "点开这张图，可以在手机上拖动、点选。"],
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
        label: "一张说明图是怎么做出来的",
        rows: [
          ["提议方案", "它觉得画图有帮助时，先提出几种画法。"],
          ["抽选风格", "主机从中随机选一种，免得每张图都长一个样。"],
          ["检查", "另一个模型看草稿截图，查有没有错的内容和看不懂的地方。"],
          ['发送', "通过检查才发出，聊天里一张图片，加一个能操作的网页链接。"],
        ],
      },
    },
    built: {
      title: "Pinejay\n是怎么开发的",
      body: ["我来决定设计和开发什么内容。具体的设计、写代码、检查和上线的工作，交给 Claude Code 和 Codex 完成。", "每个改动先登记成一个事项，写清楚怎样才算做完。写代码的那个不能自己说做完了，要由另一个 AI 从头检查一遍，每一条验收标准通过了才能上线。"],
      label: "例子：今天的天气早报改动",
      demo: {
        id: 'DEV-605d37ef',
        title: "早报不只讲下雨",
        quoteLabel: "我：",
        quote: "“雾霾、降温、防晒这些都不写吗？”",
        acceptLabel: "验收标准",
        stages: ['提出', '登记', '设计', '实现', '验收', '上线', '盯运行'],
        conditions: ["没雨的日子不再写“今天预计没有雨”。", "早报没写到的雨，白天照样提醒。", "早报和面板不再每天写数据来源。"],
        states: { open: '待验', met: '通过', failed: '未通过' },
        who: { me: '我', cc: 'Claude Code', cx: 'Codex', sys: '系统' },
        statuses: ['已提出', '已登记', '已选定设计', '已提交', '退回作者', '已修复', '验收通过', '已上线', '运行中'],
        logs: ['在 Telegram 里提出。', '登记，写了三条验收条件。', "在 Paper 里选定早报的样子。", "提交，附测试。", "第 2 条没通过：早报没写的雨也被当成写过了，退回。", "改好后重新提交。", "另一个 AI 检查，三条都通过。", "合入并上线，检查了服务。", "第二天早上：早报写了降温和防晒。"],
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
      "title": "一個度身訂造的\n私人助理",
      "body": [
        "Pinejay 是我自己做的私人助理。我主要在 Telegram 裡和它聊天：隨手記下當天的事，問它問題，或者讓它提醒我一些事情。",
        "我把每天的事隨手告訴它，它記進日記，需要的時候還能幫我找回來。它會在早上告訴我今天的天氣要注意甚麼，晚上回顧我這一天說了但還沒做的事。"
      ],
      "aside": "它不是又一個編程智能體，也不是從零手寫的一個智能體核心。上下文快取、上下文操作這類底層實現變化很快，每個框架都有各自的生態，個人開發者很難長期緊貼。所以 Pinejay 使用成熟的 Claude SDK 和 Codex SDK，在它們之上實現一層抽象介面。我把精力主要花在我想要的私人助理功能上。",
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
          "在聊天裡隨手說的事，它記入日記。整理的時候把地方、計劃和經歷按時間串起來。"
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
          "每天推送一則早報，提醒你今天值得注意的天氣。"
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
        "Pinejay 主要透過 Telegram 群組互動。群組裡每個話題由一個獨立的 AI 智能體助理負責，每個助理在自己的隔離環境（Docker 或 Apple Container）裡運行。API 憑證只保存在主機上，智能體經網關呼叫，不會直接接觸敏感憑證。",
        "為甚麼不讓它直接在整部電腦上運行？這些助理能自己執行指令、修改檔案，權限很大。放在隔離環境裡，一個助理即使出錯，或被網頁上的惡意文字誤導，最多弄壞自己的環境，也不會影響其他助理。代價是它們不能隨手使用電腦上的軟件和檔案，需要逐項設定權限。"
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
          "傳遞訊息，保存紀錄，把說明圖發布成網頁，排程定時任務"
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
          "returns": "返回結果",
          "handsBack": "交回回覆和說明圖",
          "reply": "回覆，可附說明圖",
          "keeps": "保存"
        }
      }
    },
    course: {
      title: "用自己的材料\n上一個課程",
      body: [
        "我把想學的東西和手上的材料告訴它，它會先擬一份課程計劃，我確定了方案才開課。",
        "每一課下方有四個快捷操作：下一課、換個講法、舉個例子、做練習。中途想問別的可以直接問，它答完會把問題記進計劃，再繼續講。它也會看我答得怎樣，調整快慢和難度。",
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
        side: "中途問了 40% 是甚麼意思，這一課裡答了。",
      },
    },
    weather: {
      "title": "只講今天\n值得知道的天氣",
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
      title: "把聊天說過的事\n記成日記",
      body: [
        "我在聊天中隨口說的事，它會拆成一條條紀錄：發生了甚麼、我怎麼看、打算做甚麼，再按時間排好，儲存到資料庫中。",
        "過了很久再問某個地方、某個人或某一星期，它可以用這些紀錄回答，每條紀錄都能打開，看到我當時的原話。",
      ],
      steps: { said: (d) => `${d}，在聊天中提到`, statements: (n) => `${n} 條紀錄`, timeline: '時間線', asked: '數個月後再問' },
      hint: "按一條紀錄，查看它出自原話中的哪幾個字。按時間線上的事件即可打開。",
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
      title: "每天晚上\n回看一遍",
      body: [
        "每天晚上，它把最近的聊天、日記和我讀過的文章翻一遍，看看有沒有反覆出現的問題、開了頭未做完的事，或者前後說法不一致的地方。",
        "找到了就發給我，附上我當時說的原話。下面有快捷操作可以直接回覆：讓它到時再提醒，或者告訴它這件事不做了，以後就不會再提。",
      ],
      chat: { avatar: '回', name: '回顧', sub: '每天晚上 9 時' },
      script: [
        { from: 'bot', time: '21:00', title: '未完成', text: ['你計劃四月初再到海明鎮，但之後沒有再提及訂船票。'], quotes: [['「想在四月初再到海明鎮一次。」', '10 月 2 日，日記']], keyboard: 'f1' },
        { from: 'bot', time: '21:00', title: "前後說法不一致", text: ['星期一你要求課程放慢，星期四又要求每天上兩課。'], quotes: [['「這星期放慢一點吧。」', '星期一，課程'], ['「可以每天上兩課嗎？」', '星期四，課程']], keyboard: 'f2' },
      ],
      keys: { f1: [['remind', '三月提醒我'], ['drop', '不去了']], f2: [['slow', '保持慢節奏'], ['two', '每天兩課']] },
      replies: { remind: '3 月 1 日會提醒你訂船票。', drop: '已從計劃中刪除，之後不會再提。', slow: '課程維持每天一課。', two: '由明天起，課程每天發送兩課。' },
      side: {
        label: "它讀哪些",
        rows: [
          ['7 天', '對話', "在 Telegram、終端機和編程工具中說過的話。"],
          ['7 天', "日記和訂閱", "發生了甚麼、打算做甚麼、讀了甚麼。"],
          ['星期日', '每週回看', '去年同一星期，以及之後改變了的看法。'],
        ],
        checkLabel: "原話核對",
        checkText: "每句原話都會與標示的出處核對一遍，對不上的不發。",
      },
    },
    widgets: {
      title: "講不清的地方，\n畫張圖解釋",
      body: ["問題用圖更容易解釋清楚時，它會在回答中放一張圖，再對著圖講解。", "打開這張圖，可以在手機上拖動、點選。"],
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
        label: "一張說明圖是怎樣做出來的",
        rows: [
          ["提議方案", "它覺得畫圖有幫助時，會先提出幾種畫法。"],
          ["抽選風格", "主機從中隨機選一種，免得每張圖都是同一個樣子。"],
          ["檢查", "另一個模型看草稿截圖，找出錯誤的內容和看不明白的地方。"],
          ['發送', "通過檢查才會發出：聊天中一張圖片，加上一個可以操作的網頁連結。"],
        ],
      },
    },
    built: {
      title: "Pinejay\n是怎樣開發的",
      body: ["我來決定設計和開發甚麼內容。具體的設計、寫程式、檢查和上線工作，交給 Claude Code 和 Codex 完成。", "每項改動先登記成一個事項，寫清楚怎樣才算完成。寫程式的那個不能自己說已完成，要由另一個 AI 從頭檢查一遍，每一條驗收標準都通過才能上線。"],
      label: "例子：今天的天氣早報改動",
      demo: {
        id: 'DEV-605d37ef',
        title: "早報不只講下雨",
        quoteLabel: "我：",
        quote: "「霧霾、降溫、防曬這些都不寫嗎？」",
        acceptLabel: "驗收標準",
        stages: ['提出', '登記', '設計', '實現', '驗收', '上線', '監察運行'],
        conditions: ["沒雨的日子不再寫「今天預計沒有雨」。", "早報沒提到的雨，白天照樣提醒。", "早報和面板不再每天寫資料來源。"],
        states: { open: '待驗', met: '通過', failed: '未通過' },
        who: { me: '我', cc: 'Claude Code', cx: 'Codex', sys: '系統' },
        statuses: ['已提出', '已登記', '已選定設計', '已提交', '退回作者', '已修正', '驗收通過', '已上線', '運行中'],
        logs: ['在 Telegram 提出。', '已登記，並寫下三項驗收條件。', "在 Paper 選定早報的樣子。", "提交，並附上測試。", "第 2 項未通過：早報沒提到的雨也被當成提過了，已退回。", "修正後重新提交。", "另一個 AI 檢查，三項均通過。", "合併並上線，已檢查服務。", "翌日早上：早報提到了降溫和防曬。"],
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
      "title": "自分用に作り込んだ\nアシスタント",
      "body": [
        "Pinejay は自分で作ったパーソナルアシスタントです。主に Telegram でやり取りしています。その日のことをメモしたり、質問したり、何かをリマインドしてもらったりします。",
        "その日のことを話すと日記に残してくれて、必要なときに探し出してくれます。朝は今日の天気で気をつけることを教えてくれて、夜はその日言ったのにまだやっていないことをふりかえります。"
      ],
      "aside": "新しいコーディングエージェントではなく、エージェントの中核を一から作り直すものでもありません。コンテキストのキャッシュや操作といった低レベルの実装は変化が速く、フレームワークごとに独自のエコシステムがあり、個人の開発者が追い続けるのは困難です。そこで Pinejay は成熟した Claude SDK と Codex SDK を使い、その上に抽象化したインターフェースを作っています。力は主に、自分が欲しいアシスタント機能に注いでいます。",
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
          "チャットで何気なく話したことを日記に残します。整理するときに場所・予定・出来事を時系列でつなげます。"
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
          "毎朝の天気レポートで、今日気をつけたい天気を知らせます。"
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
        "Pinejay とは主に Telegram のグループでやり取りします。グループのトピックごとに専用の AI エージェントがいて、それぞれ自分の隔離環境（Docker または Apple Container）で動きます。API の認証情報はホストにだけ置き、エージェントはゲートウェイ経由で呼び出すので、認証情報に直接触れません。",
        "なぜパソコン全体で動かさないのか。アシスタントは自分でコマンドを実行し、ファイルを書き換えられるので、権限が大きいからです。隔離環境の中なら、ミスをしたり、Web ページの悪意ある文章にだまされたりしても、壊れるのはそのアシスタントの環境だけで、ほかのアシスタントには影響しません。その代わり、パソコンのアプリやファイルは自由に使えず、権限を個別に設定する必要があります。"
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
          "メッセージを渡し、記録を保存し、図解を Web ページとして公開し、定期タスクを実行"
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
          "returns": "結果を返す",
          "handsBack": "返信と図解を戻す",
          "reply": "返信（図解つきのことも）",
          "keeps": "保存"
        }
      }
    },
    course: {
      title: "手持ちの資料で\n講座を受ける",
      body: [
        "学びたいことと手持ちの資料を伝えると、まずコース計画を作ってくれます。計画が決まってから講座が始まります。",
        "各回の下には四つのクイック操作があります。次の回へ、別の説明、例を見る、練習する。途中でほかのことを聞きたくなったらそのまま聞けば、答えたあと質問を計画に書き留めて、続きに戻ります。私の答え方を見て、ペースや難しさも調整します。",
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
        side: "途中で「40% とはどういう意味か」と聞き、この回の中で答えました。",
      },
    },
    weather: {
      "title": "今日の天気の\n要点だけ",
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
      title: "話したことを\n日記に残す",
      body: [
        "チャットで何気なく話したことを、起きたこと・自分の考え・これからの予定という一件ずつの記録に分け、時系列に並べてデータベースに保存します。",
        "ずっとあとで、ある場所、ある人、ある週について聞くと、これらの記録から答えます。どの記録も開けば、そのとき実際に話した言葉が見られます。",
      ],
      steps: { said: (d) => `${d}、チャットで話したこと`, statements: (n) => `記録 ${n} 件`, timeline: 'タイムライン', asked: '数か月後に聞く' },
      hint: "記録をタップすると、元の発言のどの言葉から来たかがわかります。タイムラインの出来事をタップすると開きます。",
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
      title: "毎晩の\nふりかえり",
      body: [
        "毎晩、最近のチャット、日記、読んだ記事にひととおり目を通し、繰り返し出てくる問題、始めたまま終わっていないこと、前と言っていることが食い違っているところを探します。",
        "見つかったら、そのときの私の発言を添えて送ってきます。下のクイック操作でそのまま返事ができます。あとでもう一度知らせてもらうか、もうやらないと伝えれば、それ以降は取り上げません。",
      ],
      chat: { avatar: 'ふ', name: 'ふりかえり', sub: '毎晩 21 時' },
      script: [
        { from: 'bot', time: '21:00', title: 'やりかけ', text: ['4 月初めにまた汐見へ行く予定でしたが、フェリーの予約の話はその後出ていません。'], quotes: [['「4 月の初めにもう一度汐見へ行きたい。」', '10 月 2 日、日記']], keyboard: 'f1' },
        { from: 'bot', time: '21:00', title: "言っていることが食い違う", text: ['月曜はコースのペースを落とすよう頼み、木曜は一日 2 回にしてほしいと頼みました。'], quotes: [['「今週はゆっくりにしよう。」', '月曜、コース'], ['「一日 2 回できる？」', '木曜、コース']], keyboard: 'f2' },
      ],
      keys: { f1: [['remind', '3 月にリマインド'], ['drop', 'やめた']], f2: [['slow', 'ゆっくりのまま'], ['two', '一日 2 回']] },
      replies: { remind: '3 月 1 日にフェリーの予約をリマインドします。', drop: '予定から外しました。今後は取り上げません。', slow: 'コースは一日 1 回のままにします。', two: '明日からコースは一日 2 回送ります。' },
      side: {
        label: '読むもの',
        rows: [
          ['7 日', '会話', "Telegram、ターミナル、コーディングツールで話したこと。"],
          ['7 日', "日記とフィード", "起きたこと、予定していること、読んだもの。"],
          ['日曜', '週ごとのふりかえり', '去年の同じ週と、その後変わった考え。'],
        ],
        checkLabel: "発言の照合",
        checkText: "引用した発言はすべて、示した出典と照らし合わせます。合わないものは送りません。",
      },
    },
    widgets: {
      title: "説明しにくい\nところは図で",
      body: ["図のほうが伝わる質問には、回答に図を一枚入れて、図を見ながら説明します。", "図をタップすると、スマホでドラッグしたりタップしたりできます。"],
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
        label: "説明図ができるまで",
        rows: [
          ["案を出す", "図が役立つと判断したら、いくつかの描き方を提案します。"],
          ["スタイルを抽選", "ホストがその中から一つをランダムに選びます。どの図も同じ見た目にならないためです。"],
          ["チェック", "別のモデルが下書きのスクリーンショットを見て、誤った内容や分かりにくいところを確認します。"],
          ['送信', "チェックを通ったものだけを送ります。チャットに画像を一枚と、操作できるページへのリンクです。"],
        ],
      },
    },
    built: {
      title: "Pinejay の\n作り方",
      body: ["何を設計し、何を作るかは私が決めます。実際の設計、コード、チェック、公開は Claude Code と Codex に任せています。", "変更はまず作業項目として登録し、何をもって完了とするかを書きます。コードを書いた側は自分で完了と言えず、別の AI が最初から確認して、受け入れ条件をすべて満たしたときだけ公開されます。"],
      label: "例：今日の天気レポートの変更",
      demo: {
        id: 'DEV-605d37ef',
        title: "レポートは雨だけじゃない",
        quoteLabel: "私：",
        quote: "「もや、冷え込み、日焼け対策は書かないの？」",
        acceptLabel: '受け入れ条件',
        stages: ['依頼', '登録', '設計', '実装', '検証', 'リリース', '監視'],
        conditions: ["雨のない日に「今日は雨の予報はありません」と書かない。", "レポートで触れなかった雨も、日中にこれまでどおり知らせる。", "レポートとパネルに毎日データの出典を書かない。"],
        states: { open: '未確認', met: '合格', failed: '不合格' },
        who: { me: '私', cc: 'Claude Code', cx: 'Codex', sys: 'システム' },
        statuses: ['依頼済み', '登録済み', 'デザイン決定', '提出済み', '作者に差し戻し', '修正済み', '検証済み', '公開中', '監視中'],
        logs: ['Telegram で依頼。', '受け入れ条件 3 つで登録。', "Paper でレポートの見た目を決定。", "テスト付きで提出。", "条件 2 が不合格：レポートで触れていない雨も触れたものとして扱われていた。差し戻し。", "修正して再提出。", "別の AI が確認し、3 条件すべて合格。", "マージして公開。サービスを確認。", "翌朝：レポートに冷え込みと日焼け対策が載った。"],
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
  { stage: 6, tone: 'live', cond: ['met', 'met', 'met'], who: 'sys', time: '07:30' },
];
for (const lang of Object.values(window.CONTENT)) {
  const d = lang.built.demo;
  d.steps = DEMO_SHAPE.map((s, i) => ({ ...s, status: d.statuses[i], log: { time: s.time, who: s.who, text: d.logs[i] } }));
}
