<div align='center'>
 <img src='https://raw.githubusercontent.com/solguruz/react-calendar/develop/assets/readmeimgs/heroimage.png'/>
</div>

# solguruz-react-calendar

[![npm version](https://img.shields.io/npm/v/solguruz-react-calendar.svg)](https://www.npmjs.com/package/solguruz-react-calendar)
[![npm downloads](https://img.shields.io/npm/dm/solguruz-react-calendar.svg)](https://www.npmjs.com/package/solguruz-react-calendar)
[![license](https://img.shields.io/npm/l/solguruz-react-calendar.svg)](./LICENSE)

A lightweight, dark-mode-aware React calendar component with month and week views, color-coded events, and an event detail popup.

> **Requirements:** React 18 or 19 (peer dependency) and [`dayjs`](https://day.js.org/).

## Features

- **Week View:** Display the calendar in a weekly format, showing individual days of the week horizontally. Each day have separate columns or sections to represent different time slots.

- **Month View:** Display the calendar in a monthly format, showing all days of the month in a grid layout. Each day should provide a summary of the events scheduled for that day.

- **Event Display:** Show events as blocks or markers within the calendar grid. In both week and month views, events should be visually distinguishable and displayed in their respective time slots.

- **Event Details Modal:** When a user clicks on an event in the calendar, open a modal window displaying detailed information about the event. This should include the event title, description, start and end time, and any other relevant information.

## Screenshots

<img src='https://raw.githubusercontent.com/solguruz/react-calendar/develop/assets/readmeimgs/desktopMonth.png' />

<img src='https://raw.githubusercontent.com/solguruz/react-calendar/develop/assets/readmeimgs/desktopWeek.png' />

<img src='https://raw.githubusercontent.com/solguruz/react-calendar/develop/assets/readmeimgs/tablet.png' />

<img src='https://raw.githubusercontent.com/solguruz/react-calendar/develop/assets/readmeimgs/mobile.png' />

## Installation

```bash
npm install solguruz-react-calendar dayjs
```

Then import the pre-built stylesheet once at your app's entry point:

```tsx
import 'solguruz-react-calendar/styles';
```

> **Tailwind users** — if your project already uses Tailwind, add the package to your `content` paths instead of importing the stylesheet:
>
> ```js
> // tailwind.config.js
> content: [
>   // ...your existing paths
>   './node_modules/solguruz-react-calendar/dist/**/*.{js,mjs}',
> ];
> ```

## Quick Start

```tsx
import { Calendar } from 'solguruz-react-calendar';
import 'solguruz-react-calendar/styles';

const events = [
  {
    date: '16/06/2026', // DD/MM/YYYY
    task: [
      { startTime: '09:00 AM', endTime: '10:00 AM', title: 'Team Standup' },
      { startTime: '02:00 PM', endTime: '03:00 PM', title: 'Design Review' },
    ],
  },
];

export default function App() {
  return <Calendar name="My Calendar" type="month" events={events} />;
}
```

## Props

| Prop            | Type                         | Required | Description                                                                              |
| --------------- | ---------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `name`          | `string`                     | Yes      | Calendar title shown in the header                                                       |
| `type`          | `"month" \| "week" \| "all"` | Yes      | View mode. `"all"` shows a Month/Week toggle                                             |
| `events`        | `Data[]`                     | No       | Array of event objects (see types below). Defaults to `[]`                               |
| `disabledDates` | `string[]`                   | No       | Dates to disable in `DD/MM/YYYY` format. Disabled cells are non-clickable and grayed out |

## Types

```ts
import type { Data, WeekData } from 'solguruz-react-calendar';

interface Data {
  date: string; // DD/MM/YYYY
  task: {
    startTime: string; // e.g. "09:00 AM"
    endTime: string; // e.g. "10:00 AM"
    title: string;
  }[];
}

interface WeekData {
  startTime: string;
  endTime: string;
  title: string;
}
```

## Usage Examples

**Month view**

```tsx
<Calendar name="Team Calendar" type="month" events={events} />
```

**Week view**

```tsx
<Calendar name="Team Calendar" type="week" events={events} />
```

**Both views with a toggle**

```tsx
<Calendar name="Team Calendar" type="all" events={events} />
```

**With disabled dates**

```tsx
<Calendar
  name="Team Calendar"
  type="month"
  events={events}
  disabledDates={['21/06/2026', '22/06/2026']}
/>
```

## Dark Mode

The calendar includes a built-in moon/sun toggle button in the header. No extra configuration is needed — it:

1. Reads `localStorage` for a saved preference on mount
2. Falls back to the OS `prefers-color-scheme` setting if no preference is saved
3. Persists the choice to `localStorage` on every toggle

## Tech Stack

**Library:** React, TypeScript, Tailwind CSS (pre-compiled), dayjs
**Demo app:** Next.js

## Local Development

Clone and install:

```bash
git clone https://github.com/solguruz/react-calendar.git
cd react-calendar
npm install
```

Run the Next.js demo app:

```bash
npm run dev
```

Build the distributable library:

```bash
npm run build:lib
```

Create and inspect the npm tarball:

```bash
npm run pack:lib
```

## Testing Locally in Another Project

**Option 1 — `npm link` (recommended during development)**

```bash
# in this repo
npm link

# in your consumer project
npm link solguruz-react-calendar
```

After any change, re-run `npm run build:lib` — the consumer project picks up the update automatically.

**Option 2 — install the tarball**

```bash
# in this repo
npm run pack:lib

# in your consumer project
npm install /path/to/solguruz-react-calendar-0.1.0.tgz
```

## Scripts

| Command             | Description                                        |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start the Next.js demo app                         |
| `npm run build`     | Build the Next.js demo app                         |
| `npm run lint`      | Run ESLint                                         |
| `npm run build:lib` | Bundle the library (JS + CSS) into `dist/`         |
| `npm run pack:lib`  | Build then create an npm tarball for local testing |

## 🚀 About Us

Engineering Quality Solutions by employing technologies with Passion and Love | Web and Mobile App Development Company in India and Canada

## 🔗 Links

<div align="left">
<a href="https://solguruz.com/" target="_blank">
<img src="https://raw.githubusercontent.com/solguruz/react-calendar/develop/assets/readmeimgs/solguruz.svg" alt=solguruz style="margin-bottom: 5px;" />
</a>
<a href="https://www.facebook.com/SolGuruzHQ" target="_blank">
<img src="https://raw.githubusercontent.com/solguruz/react-calendar/develop/assets/readmeimgs/facebook.svg" alt=facebook style="margin-bottom: 5px;" />
</a>

<a href="https://www.linkedin.com/company/solguruz/" target="_blank">
<img src="https://raw.githubusercontent.com/solguruz/react-calendar/develop/assets/readmeimgs/linkedin.svg" alt=linkedin style="margin-bottom: 5px;" />
</a>
<a href="https://www.instagram.com/solguruz/" target="_blank">
<img src="https://raw.githubusercontent.com/solguruz/react-calendar/develop/assets/readmeimgs/instagram.svg" alt=instagram style="margin-bottom: 5px;" />
</a>

<a href="https://twitter.com/SolGuruz" target="_blank">
<img src="https://raw.githubusercontent.com/solguruz/react-calendar/develop/assets/readmeimgs/twitter.svg" alt=twitter style="margin-bottom: 5px;" />
</a>
<a href="https://www.behance.net/solguruz" target="_blank">
<img src="https://raw.githubusercontent.com/solguruz/react-calendar/develop/assets/readmeimgs/behance.svg" alt=behance style="margin-bottom: 5px;" />
</a>
<a href="https://dribbble.com/SolGuruz" target="_blank">
<img src="https://raw.githubusercontent.com/solguruz/react-calendar/develop/assets/readmeimgs/dribbble.svg" alt=dribbble style="margin-bottom: 5px;" />
</a>

</div>

## Contributing

Contributions are always welcome! Open an issue or pull request on the
[GitHub repository](https://github.com/solguruz/react-calendar).

## License

```text
MIT License

Copyright (c) 2026 SolGuruz Pvt. Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
