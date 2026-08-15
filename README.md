# Intervyou

### AI-powered technical interview practice

Intervyou is an AI-powered mock interview platform that simulates a technical interview based on a candidate's target role, experience level, and chosen topics.

The goal was to build a complete, runnable AI agent rather than simply wrapping an LLM in a chat interface.

---

**Live Demo:** [Add deployed URL]



https://github.com/user-attachments/assets/d6912bb0-3ce0-4b1f-8352-a8fe6cdc9a94



---
## What Intervyou Does

A candidate provides:

- Target role
- Experience level
- Technical topics

Intervyou then:

1. Generates a 5-question technical interview using an LLM.
2. Presents the questions one at a time.
3. Collects the candidate's answers.
4. Evaluates all answers after the interview is complete.
5. Produces a score for every question.
6. Generates an overall evaluation.
7. Identifies strengths and areas for improvement.
8. Presents the results through a structured results dashboard.

---
# Running Locally

## Prerequisites

Make sure you have installed:

* Python 3.10+
* Node.js
* npm
* A Groq API key

---

## 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>

cd intervyou
```

---

## 2. Set up the backend

Navigate to the backend:

```bash
cd backend
```

Create and activate a virtual environment.

### Windows

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

---

## 3. Configure the API key

Create a `.env` file inside `backend/`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Do not commit this file.

---

## 4. Start the backend

From the project root:

```bash
uvicorn backend.app.main:app --reload
```

The FastAPI server will run at:

```text
http://127.0.0.1:8000
```

FastAPI's interactive API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

---

## 5. Start the frontend

Open another terminal.

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the URL shown by Vite, typically:

```text
http://localhost:5173
```

---

# Environment Variables

The backend requires:

| Variable       | Description                                         |
| -------------- | --------------------------------------------------- |
| `GROQ_API_KEY` | API key used to access the Llama model through Groq |

Example:

```env
GROQ_API_KEY=your_api_key
```

---
# Tradeoffs

## End-of-interview evaluation

The system evaluates all answers after the interview rather than evaluating after every answer.

**Advantages:**

* Fewer LLM calls
* Lower token usage
* Lower latency
* Simpler architecture
* Still provides per-question scoring

**Tradeoff:**

The system cannot currently use evaluation of an earlier answer to dynamically change a later question.

---

## Five fixed questions

The MVP uses five questions per interview.

This keeps interview length predictable and satisfies the minimum session requirement while keeping API usage controlled.

A future version could support configurable interview length.

---

## In-memory interview state

The current MVP does not persist completed interviews to a database.

This was an intentional scope decision for the challenge.

The priority was to complete and ship the core end-to-end AI agent:

```text
Input
 ↓
AI question generation
 ↓
Interview
 ↓
AI evaluation
 ↓
Structured results
```

Persistent interview history, authentication, and long-term user analytics were left outside the MVP.

---

# Future Improvements

Potential extensions include:

* Persistent interview history
* Adaptive question difficulty
* Dynamic follow-up questions
* Voice-based interviews
* Authentication and user profiles
* Interview performance analytics
* More detailed scoring rubrics
* Multiple interview modes
* Model comparison and evaluation

---

