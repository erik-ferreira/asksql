"use client"

import { useState } from "react"
import { Stars } from "lucide-react"
import { useCompletion } from "ai/react"
import Editor from "react-simple-code-editor"
import { highlight, languages } from "prismjs"

import "prismjs/components/prism-sql"
import "prismjs/themes/prism-dark.css"

export function Form() {
  const [schema, setSchema] = useState("")

  const { completion, input, handleInputChange, handleSubmit } = useCompletion({
    api: "/api/generate-sql",
    body: {
      schema,
    },
  })

  const result = completion

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="py-8 w-full flex flex-col text-foam"
      >
        <label htmlFor="schema" className="text-lg font-light">
          Cole seu código SQL aqui:
        </label>
        <Editor
          value={schema}
          onValueChange={(code) => setSchema(code)}
          highlight={(code) => highlight(code, languages.sql, "sql")}
          padding={16}
          textareaId="schema"
          textareaClassName="outline-none"
          className="h-40 font-mono my-4 bg-blueberry-600 border border-blueberry-300 rounded-md outline-none focus-within:ring-1 focus-within:ring-lime-600"
        />

        <label htmlFor="question" className="text-lg font-light">
          Faça uma pergunta sobre o código:
        </label>
        <textarea
          id="question"
          name="question"
          className="my-4 bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-lime-600"
          value={input}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="text-pistachio flex items-center justify-center gap-2 rounded-lg border border-pistachio h-14"
        >
          <Stars className="w-6 h-6" />
          Perguntar à inteligência artificial
        </button>
      </form>

      <div className="mt-6">
        <span className="text-lg font-light text-foam">Respostas:</span>

        {/* <Editor
          readOnly
          value={result}
          onValueChange={() => {}}
          highlight={(code) => highlight(code, languages.sql, "sql")}
          padding={16}
          textareaClassName="outline-none"
          className="w-full my-4 bg-transparent border border-blueberry-300 rounded-md"
        /> */}

        <textarea
          className="w-full text-foam h-40 my-4 bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-lime-600"
          value={result}
        />
      </div>
    </>
  )
}
