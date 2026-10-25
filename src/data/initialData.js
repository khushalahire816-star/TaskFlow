export const INITIAL_TASKS = [
  {
    id: "TASK-8842",
    node: "NODE_01",
    title: "Refactor Global Design Tokens",
    project: "#UI_REFACTOR",
    status: "todo", // 'todo' | 'in-progress' | 'completed'
    priority: "high", // 'low' | 'medium' | 'high'
    dueDate: "2024-10-24",
    dueLabel: "OCT 24",
    estimatedHours: 14.5,
    createdAt: "Oct 12, 2024",
    assignee: {
      name: "Walter G.",
      code: "DEV-01",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0CM8hFNxIp43A-6XQ2vObZ-pqH0saX8sYrRuSCFa7Epmd_0CURVKFvrQVCBNt6zfVsGOE7HO8Pb-1ca64UJ6vTB83G2sqStM94Y5nAUpMHjf5gc5kl8ryUHzo7Jcs6wkYEm4g2swSomt4fW3mTSDDaJhdbhUmxj_2aFy-1ZAF1X709Q7Ls8P5pHe-P9KZaWYQOIlmZydYajd_VawOwq2Afxt0Vn-VOhMD1tCwP33ragyAvHN1h8Kj"
    },
    description: `## Objective
Refactor current design system components to strictly mirror Neo-Brutalist Bauhaus principles.

### Key Deliverables:
- Eliminate all soft drop shadows; implement 2px solid black borders with hard offset shadows (\`4px 4px 0px #1a1a1a\`).
- Standardize color tokens across all primary views.
- Ensure type hierarchy uses massive Space Grotesk scales against Inter body copy.`,
    attachments: [
      { id: "att-1", name: "bauhaus_tokens_v2.json", size: "24.5 KB", time: "Added 2h ago", type: "code" },
      { id: "att-2", name: "wireframe_grid_mockup.png", size: "1.2 MB", time: "Added yesterday", type: "image" }
    ],
    comments: [
      {
        id: "c-1",
        author: "Marianne B.",
        time: "10:42 AM",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxoD5OMSGf4iL1D0arwBbbxKiJmkpCirpZVEDHqmTcIV14GeQRj-Oce6sUa7rPWWLsCzBK35Ixd2VUGz9ReBZk-6zIV3HzXQho6KCP5Tu1Y7gg-Q7fhuOly0sJQHuwU3jR1BG-AfINVEDG4wLTVetxq3SQxNktiSh-Oqm4Zlp8NNPkZyqXKloZY0xHHWawRhTioRJ6TGFOoy0_nt-vxoJ_pU5d3ff7TLwqALI5kNmTzgS5gZjU1A1i",
        content: "Make sure the offset shadows strictly follow the #1a1a1a color code. No soft blurs!"
      },
      {
        id: "c-2",
        author: "Wassily K.",
        time: "11:15 AM",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7LnQgPvBwMXd4kSESFBIgH86wp-nAloBxMT0M5XBecwoggGYACUOJ8wIJnn8zIwVzbtuWTm7dQa2sa1aXySfr5EILdfBy5SPdThBOz_NxVqg4YvOSiEjxZbDV3FKawYzs3xEDs9Ll57dtYx5XGdp_r5SV0YAn45ncFbdy3slCoWZssW964b8zNGXabAbK6WiQG3-6hpixM3p5hsh5m7Ltu35goPMuEyByD4x0ol9ROpz0boRfBOt9",
        content: "Checked the color tokens. The yellow #ffcc00 accent pops wonderfully against the aged paper background."
      }
    ],
    activity: [
      { id: "act-1", text: "Priority changed to High", meta: "Today by Walter G.", color: "secondary" },
      { id: "act-2", text: "Attachment uploaded", meta: "Yesterday by Marianne B.", color: "tertiary" },
      { id: "act-3", text: "Task created (#8842)", meta: "Oct 12, 2024", color: "primary" }
    ]
  },
  {
    id: "TASK-8843",
    node: "NODE_04",
    title: "Kanban Drag & Drop Engine",
    project: "#FRONTEND",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-10-25",
    dueLabel: "TODAY",
    estimatedHours: 8.0,
    createdAt: "Oct 14, 2024",
    assignee: {
      name: "Laszlo M.",
      code: "UI-08",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC09Wd3lCOhTMYIE9AohM-1YHDoL6zTqvIM4shEpydA9b5yBmBbISD_qURfy0e2GF56n2FiLjLZ8T0fKbQ6dqAhZ1C5S_HA7TMfAY9_OfMcPIGN7dnSvNeMIDHJYz29Ls_1YsH6XdPX6In9ctQWZ0SDF1iEhGZ57ZUgJk7IIEthd0zUsXPkrtdm5gfjGwLJ3neE-4v5feC0pKbJaCXkNXXpedkuXIEr4GN2QEF3to2HVlRIHcHjds-r"
    },
    description: `## Objective
Implement snappy vanilla JS / React state transitions for column reordering and status updates.

### Requirements:
- Support drag and drop or instant column shift buttons.
- Update global state and persist changes immediately.
- Trigger cyber-brutalist tactile haptic animations on move.`,
    attachments: [
      { id: "att-3", name: "dnd_state_spec.md", size: "12.1 KB", time: "Added 1d ago", type: "code" }
    ],
    comments: [
      {
        id: "c-3",
        author: "Walter G.",
        time: "09:20 AM",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0CM8hFNxIp43A-6XQ2vObZ-pqH0saX8sYrRuSCFa7Epmd_0CURVKFvrQVCBNt6zfVsGOE7HO8Pb-1ca64UJ6vTB83G2sqStM94Y5nAUpMHjf5gc5kl8ryUHzo7Jcs6wkYEm4g2swSomt4fW3mTSDDaJhdbhUmxj_2aFy-1ZAF1X709Q7Ls8P5pHe-P9KZaWYQOIlmZydYajd_VawOwq2Afxt0Vn-VOhMD1tCwP33ragyAvHN1h8Kj",
        content: "Make sure column transitions don't cause layout shifting on 120Hz displays."
      }
    ],
    activity: [
      { id: "act-4", text: "Moved to In Progress", meta: "Today by Laszlo M.", color: "tertiary" }
    ]
  },
  {
    id: "TASK-8844",
    node: "NODE_02",
    title: "Typography Scale Audit",
    project: "#DESIGN_SYSTEM",
    status: "todo",
    priority: "medium",
    dueDate: "2024-10-28",
    dueLabel: "OCT 28",
    estimatedHours: 6.0,
    createdAt: "Oct 15, 2024",
    assignee: {
      name: "Marianne B.",
      code: "TYPO-02",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC95I68Bsu55z3WEdQ0CBtc9xvKJMgmOtrMgnrpgO5SGRQyPVvbOegAead1nercOmpfasqz6OzaJxPfPBObY39DjYS-uTKuHAc3Ju9VCn827bfTR0r7-7VLbnUCDViWi8a_3n83_iOS9Z3rwQz2samXfNmnu4Nj59vxzSw71tqFxLwn7z7uJHITgyKFo72Jbmh1FN5iux981gLdFl_3C8Ptlq_yHwOdq-ZayxiRi91y23M9WNwgZy34"
    },
    description: `## Objective
Ensure Space Grotesk headers scale dramatically against Inter body text with strict contrast rules.

### Typography Guidelines:
- Headline scale: Space Grotesk 700 with letter-spacing -0.03em.
- Display size ratio should be at least 3x over standard body size.
- Strictly uppercase for headings and action labels.`,
    attachments: [],
    comments: [],
    activity: [
      { id: "act-5", text: "Task created", meta: "Oct 15, 2024 by Marianne B.", color: "primary" }
    ]
  },
  {
    id: "TASK-8845",
    node: "NODE_03",
    title: "Asset Pipeline Optimization",
    project: "#PIPELINE",
    status: "todo",
    priority: "low",
    dueDate: "2024-11-02",
    dueLabel: "NOV 02",
    estimatedHours: 5.0,
    createdAt: "Oct 16, 2024",
    assignee: {
      name: "Paul K.",
      code: "SYS-04",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEXia7StwDHoV0sp3Zym3rwobAU_i1QFCkFG0SeGj9Vr6Rh9saDQp5yu4aZ4eqXznKIH1LovX3RUszQpA8ry12hIu8l2aW-K03N34E-MV96JhYp9A69dMhBZ6PFoFpQmu--QA7BDqCW1h24i9GDia3AMIVLKlY95XfRVj5A4nemWQ7auaqSQOHsLCPrLMp4nY3T-So9JLyvBN2u44qGFRtCgXT72g_-KJF25_VbfNkf-kM3p3S6cjq"
    },
    description: `## Objective
Review placeholder descriptions and ensure strict compliance with 50-100 word generation prompts and CDN asset caching.`,
    attachments: [],
    comments: [],
    activity: []
  },
  {
    id: "TASK-8848",
    node: "NODE_05",
    title: "Responsive Sidebar Drawer",
    project: "#FRONTEND",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-10-26",
    dueLabel: "TOMORROW",
    estimatedHours: 4.5,
    createdAt: "Oct 17, 2024",
    assignee: {
      name: "Anni A.",
      code: "NAV-03",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrgsVL-nnZTODRfKEVkZ3wx3T86-0a73vfN7ipVTF8DpeMxLgGl7V2b3BhptaQz5ucVrkuBUBXeCpUGYh7-IEruCQy8Q0bQrBzLoj29TUEoFv2DKEfNf0E8P6n2YQn-VC-VXHajTaWmWIGWo_sihYAXwvv36R2Ks-7Z-ZTIYJFfDxAERYQb_d9oPV-Ro6SySj9xELsNlX7NWdngKVBiZXahkBlIJdH_e7c_4Yy2FLeUgZgPNTp68-h"
    },
    description: `## Objective
Fix fixed positioning offsets and mobile navigation collapse behaviors. Ensure smooth sidebar toggling on smaller screens.`,
    attachments: [],
    comments: [],
    activity: []
  },
  {
    id: "TASK-8846",
    node: "NODE_06",
    title: "API Rate Limiting Fix",
    project: "#BACKEND",
    status: "completed",
    priority: "high",
    dueDate: "2024-10-23",
    dueLabel: "YESTERDAY",
    estimatedHours: 7.0,
    createdAt: "Oct 10, 2024",
    assignee: {
      name: "Anni A.",
      code: "DEV-02",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrgsVL-nnZTODRfKEVkZ3wx3T86-0a73vfN7ipVTF8DpeMxLgGl7V2b3BhptaQz5ucVrkuBUBXeCpUGYh7-IEruCQy8Q0bQrBzLoj29TUEoFv2DKEfNf0E8P6n2YQn-VC-VXHajTaWmWIGWo_sihYAXwvv36R2Ks-7Z-ZTIYJFfDxAERYQb_d9oPV-Ro6SySj9xELsNlX7NWdngKVBiZXahkBlIJdH_e7c_4Yy2FLeUgZgPNTp68-h"
    },
    description: `## Objective
Configure Redis token-bucket rate limiter to safeguard operations matrix endpoints under heavy load.`,
    attachments: [],
    comments: [],
    activity: [
      { id: "act-6", text: "Marked as Completed", meta: "Oct 23 by Anni A.", color: "tertiary" }
    ]
  },
  {
    id: "TASK-8847",
    node: "NODE_07",
    title: "User Research Synthesis",
    project: "#UX_RESEARCH",
    status: "todo",
    priority: "low",
    dueDate: "2024-10-28",
    dueLabel: "OCT 28",
    estimatedHours: 10.0,
    createdAt: "Oct 18, 2024",
    assignee: {
      name: "Marianne B.",
      code: "RES-01",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWm8uTffrVJPfzcbudBKjtP8mEWghB1gADl382xD-AQhjgqPXRe8VoSiuwQiNsz4HafLnE7uNlBoMMupNLZrpRXrOO0MqGpkSd-7KPm43aVeS8QQ8nByj957vpypDZrVwwPSVQOuzpVlFncE_gb57KM0zH69YOQKQjOzFohu-ptmDuOX6JxZr5Sm2xOh_kY35Si0VZls96ffsAp3rsurHIofTPMwsvRVWSn2CmPPexlkOkwbsviWeM"
    },
    description: `## Objective
Synthesize interviews with 12 studio leads regarding task flow visualization and rapid keyboard shortcuts.`,
    attachments: [],
    comments: [],
    activity: []
  },
  {
    id: "TASK-8849",
    node: "NODE_08",
    title: "Initial Wireframe Sketch",
    project: "#DESIGN_SYSTEM",
    status: "completed",
    priority: "low",
    dueDate: "2024-10-20",
    dueLabel: "DONE",
    estimatedHours: 3.5,
    createdAt: "Oct 05, 2024",
    assignee: {
      name: "Wassily K.",
      code: "CORE-01",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUdljInCKwV9CAGjycf8wZwr54iAqKhbzNJIIc6i-ru_aiyxuPCK1I8bYLnZtwdPjBqYyQAczTNtnSFs4bcPP0Gh4iW87ijvEDfgAIjBh4VFO_YC-dRRaU0CdxkUV26Z4F3PtUozeHlf2wA7_MeVhtLWhlIvtr918DRHHbth0DmfyCWyJaR73Cl1SL8zKkeQJWoKmjNrGJ1R5yJF_vzmdiLXDd29WyW0G9oec3R4D5b8LAfr3VDijP"
    },
    description: `## Objective
Initial layout planning on paper with thick black markers and primary color splashes.`,
    attachments: [],
    comments: [],
    activity: []
  }
];

export const VELOCITY_DATA = [
  { day: "M", label: "Mon", count: 4, heightPct: 40, color: "var(--color-primary)" },
  { day: "T", label: "Tue", count: 7, heightPct: 70, color: "var(--color-primary)" },
  { day: "W", label: "Wed", count: 5, heightPct: 50, color: "var(--color-primary)" },
  { day: "T", label: "Thu", count: 9, heightPct: 90, color: "var(--accent-blue)" },
  { day: "F", label: "Fri", count: 6, heightPct: 60, color: "var(--color-primary)" },
  { day: "S", label: "Sat", count: 3, heightPct: 30, color: "var(--accent-red)" },
  { day: "S", label: "Sun", count: 2, heightPct: 20, color: "var(--color-primary)" }
];
