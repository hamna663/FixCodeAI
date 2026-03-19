import { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import "./App.css";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Header from "./components/Header";
import Footer from "./components/Footer";

function getDefaultCode(lang) {
  switch (lang) {
    case "javascript":
      return "function sum(a, b) {\n  return a + b;\n}";
    case "python":
      return "def sum(a, b):\n    return a + b";
    case "java":
      return "public int sum(int a, int b) {\n    return a + b;\n}";
    case "cpp":
      return "int sum(int a, int b) {\n    return a + b;\n}";
    case "c":
      return "int sum(int a, int b) {\n    return a + b;\n}";
    case "csharp":
      return "int Sum(int a, int b) {\n    return a + b;\n}";
    case "fsharp":
      return "let sum a b = a + b";
    case "ruby":
      return "def sum(a, b)\n  a + b\nend";
    case "rust":
      return "fn sum(a: i32, b: i32) -> i32 {\n    a + b\n}";
    case "r":
      return "sum <- function(a, b) {\n  a + b\n}";
    default:
      return "";
  }
}

const backend= import.meta.env.VITE_BACKEND_URL

function App() {
  const [lang, setLang] = useState("javascript");
  const [code, setCode] = useState(getDefaultCode("javascript"));
  const [review, setReview] = useState("Review will shown here");
  const [loading, setLoading] = useState(false);
  const getReview = async () => {
    setLoading(true);
    try {
      const r = await axios.post(`${backend}/get-review`, { code });
      setReview(r.data);
    } catch {
      setReview("Failed to get Review, Please try again in a few minutes.");
    }
    setLoading(false);
  };
  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    setCode(getDefaultCode(newLang));
  };
  return (
    <>
      <Header />
      <main className="my-4 flex gap-5 justify-center px-4 flex-wrap max-w-screen">
        <div className="sm:w-[45%] w-full my-2 overflow-auto">
          <h2 className="text-4xl font-bold text-center text-[#242432]">
            Code Editor
          </h2>
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) => {
              if (!Prism.languages[lang]) {
                try {
                  require(`prismjs/components/prism-${lang}`);
                } catch (e) {}
              }
              return Prism.highlight(
                code,
                Prism.languages[lang] || Prism.languages.javascript,
                lang
              );
            }}
            padding={10}
            className="bg-[#323741] text-[#e0e0e0] rounded p-4 h-[70vh]"
          />
          <div className="flex mx-5 my-2 justify-between">
            <select
              className="bg-[#23272f] buttons appearance-none"
              style={{
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
                paddingRight: "24px",
                backgroundImage: "none",
              }}
              value={lang}
              onChange={handleLangChange}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="csharp">C#</option>
              <option value="fsharp">F#</option>
              <option value="ruby">Ruby</option>
              <option value="rust">Rust</option>
              <option value="r">R</option>
            </select>
            <button className="bg-[#23272f] buttons" onClick={getReview}>
              Review
            </button>
          </div>
        </div>
        <div className="sm:w-[45%] w-full">
          <h2 className="text-4xl font-bold text-center text-[#242432]">
            Review
          </h2>
          <div className="bg-[#323741] text-[#e0e0e0] rounded p-4  h-[70vh] overflow-auto mt-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center w-full mt-5">
                <svg
                  className="animate-spin h-8 w-8 text-[#29b6f6] mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="#29b6f6"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span className="text-[#29b6f6] font-semibold">
                  Loading review...
                </span>
              </div>
            ) : (
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  span: ({ node, ...props }) => (
                    <span
                      style={{
                        color: props.style?.color || "#ff6f61",
                        fontWeight: "bold",
                      }}
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong
                      style={{
                        color: "#81807cff",
                        background: "#333",
                        padding: "2px 6px",
                        borderRadius: 4,
                      }}
                      {...props}
                    />
                  ),
                  em: ({ node, ...props }) => (
                    <em
                      style={{
                        color: "#64b5f6",
                        background: "#222",
                        padding: "2px 6px",
                        borderRadius: 4,
                      }}
                      {...props}
                    />
                  ),
                  h1: ({ node, ...props }) => (
                    <h1
                      style={{
                        color: "#00e676",
                        borderBottom: "2px solid #00e676",
                        marginBottom: 8,
                      }}
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      style={{
                        color: "#29b6f6",
                        borderBottom: "1px solid #29b6f6",
                        marginBottom: 6,
                      }}
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      style={{ color: "#ffb300", marginBottom: 4 }}
                      {...props}
                    />
                  ),
                  code: ({ node, ...props }) => (
                    <code
                      style={{
                        background: "#1e1e1e",
                        color: "#19ffff",
                        borderRadius: 6,
                        padding: "2px 6px",
                        textShadow: "none",
                        fontSize: "1em",
                        overflow: "scroll",
                      }}
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      style={{ color: "#e0e0e0", marginBottom: 8 }}
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      style={{ color: "#90caf9", marginLeft: 20 }}
                      {...props}
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      style={{ color: "#f48fb1", marginLeft: 20 }}
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li style={{ marginBottom: 4 }} {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      style={{
                        color: "#a5d6a7",
                        borderLeft: "4px solid #00e676",
                        paddingLeft: 12,
                        margin: "8px 0",
                      }}
                      {...props}
                    />
                  ),
                }}
              >
                {review}
              </Markdown>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
